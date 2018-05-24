import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AssociationComponent } from './association.component';
import { AssociationDetailComponent } from './association-detail.component';
import { AssociationPopupComponent } from './association-dialog.component';
import { AssociationDeletePopupComponent } from './association-delete-dialog.component';

export const associationRoute: Routes = [
    {
        path: 'association',
        component: AssociationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Associations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'association/:id',
        component: AssociationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Associations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const associationPopupRoute: Routes = [
    {
        path: 'association-new',
        component: AssociationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Associations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'association/:id/edit',
        component: AssociationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Associations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'association/:id/delete',
        component: AssociationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Associations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
