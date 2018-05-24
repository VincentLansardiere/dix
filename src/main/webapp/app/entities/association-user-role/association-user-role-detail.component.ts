import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AssociationUserRole } from './association-user-role.model';
import { AssociationUserRoleService } from './association-user-role.service';

@Component({
    selector: 'jhi-association-user-role-detail',
    templateUrl: './association-user-role-detail.component.html'
})
export class AssociationUserRoleDetailComponent implements OnInit, OnDestroy {

    associationUserRole: AssociationUserRole;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private associationUserRoleService: AssociationUserRoleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssociationUserRoles();
    }

    load(id) {
        this.associationUserRoleService.find(id)
            .subscribe((associationUserRoleResponse: HttpResponse<AssociationUserRole>) => {
                this.associationUserRole = associationUserRoleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssociationUserRoles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'associationUserRoleListModification',
            (response) => this.load(this.associationUserRole.id)
        );
    }
}
