import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Association } from './association.model';
import { AssociationService } from './association.service';

@Component({
    selector: 'jhi-association-detail',
    templateUrl: './association-detail.component.html'
})
export class AssociationDetailComponent implements OnInit, OnDestroy {

    association: Association;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private associationService: AssociationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssociations();
    }

    load(id) {
        this.associationService.find(id)
            .subscribe((associationResponse: HttpResponse<Association>) => {
                this.association = associationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssociations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'associationListModification',
            (response) => this.load(this.association.id)
        );
    }
}
