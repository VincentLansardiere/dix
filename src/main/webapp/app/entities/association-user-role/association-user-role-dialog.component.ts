import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssociationUserRole } from './association-user-role.model';
import { AssociationUserRolePopupService } from './association-user-role-popup.service';
import { AssociationUserRoleService } from './association-user-role.service';
import { UserProfile, UserProfileService } from '../user-profile';
import { Association, AssociationService } from '../association';

@Component({
    selector: 'jhi-association-user-role-dialog',
    templateUrl: './association-user-role-dialog.component.html'
})
export class AssociationUserRoleDialogComponent implements OnInit {

    associationUserRole: AssociationUserRole;
    isSaving: boolean;

    userprofiles: UserProfile[];

    associations: Association[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private associationUserRoleService: AssociationUserRoleService,
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
        if (this.associationUserRole.id !== undefined) {
            this.subscribeToSaveResponse(
                this.associationUserRoleService.update(this.associationUserRole));
        } else {
            this.subscribeToSaveResponse(
                this.associationUserRoleService.create(this.associationUserRole));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AssociationUserRole>>) {
        result.subscribe((res: HttpResponse<AssociationUserRole>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AssociationUserRole) {
        this.eventManager.broadcast({ name: 'associationUserRoleListModification', content: 'OK'});
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
    selector: 'jhi-association-user-role-popup',
    template: ''
})
export class AssociationUserRolePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private associationUserRolePopupService: AssociationUserRolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.associationUserRolePopupService
                    .open(AssociationUserRoleDialogComponent as Component, params['id']);
            } else {
                this.associationUserRolePopupService
                    .open(AssociationUserRoleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
