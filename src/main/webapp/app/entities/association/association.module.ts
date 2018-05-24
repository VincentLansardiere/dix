import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DixSharedModule } from '../../shared';
import {
    AssociationService,
    AssociationPopupService,
    AssociationComponent,
    AssociationDetailComponent,
    AssociationDialogComponent,
    AssociationPopupComponent,
    AssociationDeletePopupComponent,
    AssociationDeleteDialogComponent,
    associationRoute,
    associationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...associationRoute,
    ...associationPopupRoute,
];

@NgModule({
    imports: [
        DixSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AssociationComponent,
        AssociationDetailComponent,
        AssociationDialogComponent,
        AssociationDeleteDialogComponent,
        AssociationPopupComponent,
        AssociationDeletePopupComponent,
    ],
    entryComponents: [
        AssociationComponent,
        AssociationDialogComponent,
        AssociationPopupComponent,
        AssociationDeleteDialogComponent,
        AssociationDeletePopupComponent,
    ],
    providers: [
        AssociationService,
        AssociationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DixAssociationModule {}
