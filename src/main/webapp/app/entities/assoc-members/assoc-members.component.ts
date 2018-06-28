import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Assoc_members } from './assoc-members.model';
import { Assoc_membersService } from './assoc-members.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-assoc-members',
    templateUrl: './assoc-members.component.html'
})
export class Assoc_membersComponent implements OnInit, OnDestroy {
assoc_members: Assoc_members[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private assoc_membersService: Assoc_membersService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.assoc_membersService.query().subscribe(
            (res: HttpResponse<Assoc_members[]>) => {
                this.assoc_members = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAssoc_members();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Assoc_members) {
        return item.id;
    }
    registerChangeInAssoc_members() {
        this.eventSubscriber = this.eventManager.subscribe('assoc_membersListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
