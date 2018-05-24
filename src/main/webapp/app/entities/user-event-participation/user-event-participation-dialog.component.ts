import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserEventParticipation } from './user-event-participation.model';
import { UserEventParticipationPopupService } from './user-event-participation-popup.service';
import { UserEventParticipationService } from './user-event-participation.service';
import { UserProfile, UserProfileService } from '../user-profile';
import { Event, EventService } from '../event';

@Component({
    selector: 'jhi-user-event-participation-dialog',
    templateUrl: './user-event-participation-dialog.component.html'
})
export class UserEventParticipationDialogComponent implements OnInit {

    userEventParticipation: UserEventParticipation;
    isSaving: boolean;

    userprofiles: UserProfile[];

    events: Event[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userEventParticipationService: UserEventParticipationService,
        private userProfileService: UserProfileService,
        private eventService: EventService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userProfileService.query()
            .subscribe((res: HttpResponse<UserProfile[]>) => { this.userprofiles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.eventService.query()
            .subscribe((res: HttpResponse<Event[]>) => { this.events = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userEventParticipation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userEventParticipationService.update(this.userEventParticipation));
        } else {
            this.subscribeToSaveResponse(
                this.userEventParticipationService.create(this.userEventParticipation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserEventParticipation>>) {
        result.subscribe((res: HttpResponse<UserEventParticipation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserEventParticipation) {
        this.eventManager.broadcast({ name: 'userEventParticipationListModification', content: 'OK'});
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

    trackEventById(index: number, item: Event) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-event-participation-popup',
    template: ''
})
export class UserEventParticipationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userEventParticipationPopupService: UserEventParticipationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userEventParticipationPopupService
                    .open(UserEventParticipationDialogComponent as Component, params['id']);
            } else {
                this.userEventParticipationPopupService
                    .open(UserEventParticipationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
