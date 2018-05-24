import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DixSharedModule } from '../../shared';
import {
    AssociationUserRoleService,
    AssociationUserRolePopupService,
    AssociationUserRoleComponent,
    AssociationUserRoleDetailComponent,
    AssociationUserRoleDialogComponent,
    AssociationUserRolePopupComponent,
    AssociationUserRoleDeletePopupComponent,
    AssociationUserRoleDeleteDialogComponent,
    associationUserRoleRoute,
    associationUserRolePopupRoute,
} from './';

const ENTITY_STATES = [
    ...associationUserRoleRoute,
    ...associationUserRolePopupRoute,
];

@NgModule({
    imports: [
        DixSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AssociationUserRoleComponent,
        AssociationUserRoleDetailComponent,
        AssociationUserRoleDialogComponent,
        AssociationUserRoleDeleteDialogComponent,
        AssociationUserRolePopupComponent,
        AssociationUserRoleDeletePopupComponent,
    ],
    entryComponents: [
        AssociationUserRoleComponent,
        AssociationUserRoleDialogComponent,
        AssociationUserRolePopupComponent,
        AssociationUserRoleDeleteDialogComponent,
        AssociationUserRoleDeletePopupComponent,
    ],
    providers: [
        AssociationUserRoleService,
        AssociationUserRolePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DixAssociationUserRoleModule {}
