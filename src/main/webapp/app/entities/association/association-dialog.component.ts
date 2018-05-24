import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Association } from './association.model';
import { AssociationPopupService } from './association-popup.service';
import { AssociationService } from './association.service';
import { UserProfile, UserProfileService } from '../user-profile';

@Component({
    selector: 'jhi-association-dialog',
    templateUrl: './association-dialog.component.html'
})
export class AssociationDialogComponent implements OnInit {

    association: Association;
    isSaving: boolean;

    presidents: UserProfile[];

    userprofiles: UserProfile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private associationService: AssociationService,
        private userProfileService: UserProfileService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userProfileService
            .query({filter: 'association-is-null'})
            .subscribe((res: HttpResponse<UserProfile[]>) => {
                if (!this.association.president || !this.association.president.id) {
                    this.presidents = res.body;
                } else {
                    this.userProfileService
                        .find(this.association.president.id)
                        .subscribe((subRes: HttpResponse<UserProfile>) => {
                            this.presidents = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userProfileService.query()
            .subscribe((res: HttpResponse<UserProfile[]>) => { this.userprofiles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.association.id !== undefined) {
            this.subscribeToSaveResponse(
                this.associationService.update(this.association));
        } else {
            this.subscribeToSaveResponse(
                this.associationService.create(this.association));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Association>>) {
        result.subscribe((res: HttpResponse<Association>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Association) {
        this.eventManager.broadcast({ name: 'associationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserProfileById(index: number, item: UserProfile) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-association-popup',
    template: ''
})
export class AssociationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private associationPopupService: AssociationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.associationPopupService
                    .open(AssociationDialogComponent as Component, params['id']);
            } else {
                this.associationPopupService
                    .open(AssociationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
