import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Assoc_membersComponent } from './assoc-members.component';
import { Assoc_membersDetailComponent } from './assoc-members-detail.component';
import { Assoc_membersPopupComponent } from './assoc-members-dialog.component';
import { Assoc_membersDeletePopupComponent } from './assoc-members-delete-dialog.component';

export const assoc_membersRoute: Routes = [
    {
        path: 'assoc-members',
        component: Assoc_membersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assoc_members'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assoc-members/:id',
        component: Assoc_membersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assoc_members'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assoc_membersPopupRoute: Routes = [
    {
        path: 'assoc-members-new',
        component: Assoc_membersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assoc_members'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assoc-members/:id/edit',
        component: Assoc_membersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assoc_members'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assoc-members/:id/delete',
        component: Assoc_membersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assoc_members'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
