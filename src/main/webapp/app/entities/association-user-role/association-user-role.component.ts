import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssociationUserRole } from './association-user-role.model';
import { AssociationUserRoleService } from './association-user-role.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-association-user-role',
    templateUrl: './association-user-role.component.html'
})
export class AssociationUserRoleComponent implements OnInit, OnDestroy {
associationUserRoles: AssociationUserRole[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private associationUserRoleService: AssociationUserRoleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.associationUserRoleService.query().subscribe(
            (res: HttpResponse<AssociationUserRole[]>) => {
                this.associationUserRoles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAssociationUserRoles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AssociationUserRole) {
        return item.id;
    }
    registerChangeInAssociationUserRoles() {
        this.eventSubscriber = this.eventManager.subscribe('associationUserRoleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
