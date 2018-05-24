import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserEventParticipationComponent } from './user-event-participation.component';
import { UserEventParticipationDetailComponent } from './user-event-participation-detail.component';
import { UserEventParticipationPopupComponent } from './user-event-participation-dialog.component';
import { UserEventParticipationDeletePopupComponent } from './user-event-participation-delete-dialog.component';

export const userEventParticipationRoute: Routes = [
    {
        path: 'user-event-participation',
        component: UserEventParticipationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserEventParticipations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-event-participation/:id',
        component: UserEventParticipationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserEventParticipations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userEventParticipationPopupRoute: Routes = [
    {
        path: 'user-event-participation-new',
        component: UserEventParticipationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserEventParticipations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-event-participation/:id/edit',
        component: UserEventParticipationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserEventParticipations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-event-participation/:id/delete',
        component: UserEventParticipationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserEventParticipations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
