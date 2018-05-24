import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserEventParticipation } from './user-event-participation.model';
import { UserEventParticipationService } from './user-event-participation.service';

@Component({
    selector: 'jhi-user-event-participation-detail',
    templateUrl: './user-event-participation-detail.component.html'
})
export class UserEventParticipationDetailComponent implements OnInit, OnDestroy {

    userEventParticipation: UserEventParticipation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userEventParticipationService: UserEventParticipationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserEventParticipations();
    }

    load(id) {
        this.userEventParticipationService.find(id)
            .subscribe((userEventParticipationResponse: HttpResponse<UserEventParticipation>) => {
                this.userEventParticipation = userEventParticipationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserEventParticipations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userEventParticipationListModification',
            (response) => this.load(this.userEventParticipation.id)
        );
    }
}
