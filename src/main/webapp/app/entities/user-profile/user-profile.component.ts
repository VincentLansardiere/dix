import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserProfile } from './user-profile.model';
import { UserProfileService } from './user-profile.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {
userProfiles: UserProfile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userProfileService: UserProfileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userProfileService.query().subscribe(
            (res: HttpResponse<UserProfile[]>) => {
                this.userProfiles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserProfiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserProfile) {
        return item.id;
    }
    registerChangeInUserProfiles() {
        this.eventSubscriber = this.eventManager.subscribe('userProfileListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
