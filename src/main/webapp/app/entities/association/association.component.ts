import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Association } from './association.model';
import { AssociationService } from './association.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-association',
    templateUrl: './association.component.html'
})
export class AssociationComponent implements OnInit, OnDestroy {
associations: Association[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private associationService: AssociationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.associationService.query().subscribe(
            (res: HttpResponse<Association[]>) => {
                this.associations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAssociations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Association) {
        return item.id;
    }
    registerChangeInAssociations() {
        this.eventSubscriber = this.eventManager.subscribe('associationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
