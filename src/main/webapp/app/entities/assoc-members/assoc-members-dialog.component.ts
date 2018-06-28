import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Assoc_members } from './assoc-members.model';
import { Assoc_membersPopupService } from './assoc-members-popup.service';
import { Assoc_membersService } from './assoc-members.service';
import { UserProfile, UserProfileService } from '../user-profile';
import { Association, AssociationService } from '../association';

@Component({
    selector: 'jhi-assoc-members-dialog',
    templateUrl: './assoc-members-dialog.component.html'
})
export class Assoc_membersDialogComponent implements OnInit {

    assoc_members: Assoc_members;
    isSaving: boolean;

    userprofiles: UserProfile[];

    associations: Association[];
    joined_dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private assoc_membersService: Assoc_membersService,
        private userProfileService: UserProfileService,
        private associationService: AssociationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userProfileService.query()
            .subscribe((res: HttpResponse<UserProfile[]>) => { this.userprofiles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.associationService.query()
            .subscribe((res: HttpResponse<Association[]>) => { this.associations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.assoc_members.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assoc_membersService.update(this.assoc_members));
        } else {
            this.subscribeToSaveResponse(
                this.assoc_membersService.create(this.assoc_members));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Assoc_members>>) {
        result.subscribe((res: HttpResponse<Assoc_members>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Assoc_members) {
        this.eventManager.broadcast({ name: 'assoc_membersListModification', content: 'OK'});
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

    trackAssociationById(index: number, item: Association) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-assoc-members-popup',
    template: ''
})
export class Assoc_membersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assoc_membersPopupService: Assoc_membersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.assoc_membersPopupService
                    .open(Assoc_membersDialogComponent as Component, params['id']);
            } else {
                this.assoc_membersPopupService
                    .open(Assoc_membersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
