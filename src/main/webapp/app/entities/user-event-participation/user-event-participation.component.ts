import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserEventParticipation } from './user-event-participation.model';
import { UserEventParticipationService } from './user-event-participation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-event-participation',
    templateUrl: './user-event-participation.component.html'
})
export class UserEventParticipationComponent implements OnInit, OnDestroy {
userEventParticipations: UserEventParticipation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userEventParticipationService: UserEventParticipationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userEventParticipationService.query().subscribe(
            (res: HttpResponse<UserEventParticipation[]>) => {
                this.userEventParticipations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserEventParticipations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserEventParticipation) {
        return item.id;
    }
    registerChangeInUserEventParticipations() {
        this.eventSubscriber = this.eventManager.subscribe('userEventParticipationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
