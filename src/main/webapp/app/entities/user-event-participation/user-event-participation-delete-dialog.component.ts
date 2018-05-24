import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserEventParticipation } from './user-event-participation.model';
import { UserEventParticipationPopupService } from './user-event-participation-popup.service';
import { UserEventParticipationService } from './user-event-participation.service';

@Component({
    selector: 'jhi-user-event-participation-delete-dialog',
    templateUrl: './user-event-participation-delete-dialog.component.html'
})
export class UserEventParticipationDeleteDialogComponent {

    userEventParticipation: UserEventParticipation;

    constructor(
        private userEventParticipationService: UserEventParticipationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userEventParticipationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userEventParticipationListModification',
                content: 'Deleted an userEventParticipation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-event-participation-delete-popup',
    template: ''
})
export class UserEventParticipationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userEventParticipationPopupService: UserEventParticipationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userEventParticipationPopupService
                .open(UserEventParticipationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
