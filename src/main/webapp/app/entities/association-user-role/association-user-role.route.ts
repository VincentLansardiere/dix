import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AssociationUserRoleComponent } from './association-user-role.component';
import { AssociationUserRoleDetailComponent } from './association-user-role-detail.component';
import { AssociationUserRolePopupComponent } from './association-user-role-dialog.component';
import { AssociationUserRoleDeletePopupComponent } from './association-user-role-delete-dialog.component';

export const associationUserRoleRoute: Routes = [
    {
        path: 'association-user-role',
        component: AssociationUserRoleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AssociationUserRoles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'association-user-role/:id',
        component: AssociationUserRoleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AssociationUserRoles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const associationUserRolePopupRoute: Routes = [
    {
        path: 'association-user-role-new',
        component: AssociationUserRolePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AssociationUserRoles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'association-user-role/:id/edit',
        component: AssociationUserRolePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AssociationUserRoles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'association-user-role/:id/delete',
        component: AssociationUserRoleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AssociationUserRoles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
