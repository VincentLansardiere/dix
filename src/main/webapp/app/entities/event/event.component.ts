import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Event } from './event.model';
import { EventService } from './event.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-event',
    templateUrl: './event.component.html'
})
export class EventComponent implements OnInit, OnDestroy {
events: Event[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private eventService: EventService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.eventService.query().subscribe(
            (res: HttpResponse<Event[]>) => {
                this.events = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Event) {
        return item.id;
    }
    registerChangeInEvents() {
        this.eventSubscriber = this.eventManager.subscribe('eventListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
