import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Assoc_members } from './assoc-members.model';
import { Assoc_membersService } from './assoc-members.service';

@Component({
    selector: 'jhi-assoc-members-detail',
    templateUrl: './assoc-members-detail.component.html'
})
export class Assoc_membersDetailComponent implements OnInit, OnDestroy {

    assoc_members: Assoc_members;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private assoc_membersService: Assoc_membersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssoc_members();
    }

    load(id) {
        this.assoc_membersService.find(id)
            .subscribe((assoc_membersResponse: HttpResponse<Assoc_members>) => {
                this.assoc_members = assoc_membersResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssoc_members() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assoc_membersListModification',
            (response) => this.load(this.assoc_members.id)
        );
    }
}
