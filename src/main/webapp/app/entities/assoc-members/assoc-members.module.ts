import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DixSharedModule } from '../../shared';
import {
    Assoc_membersService,
    Assoc_membersPopupService,
    Assoc_membersComponent,
    Assoc_membersDetailComponent,
    Assoc_membersDialogComponent,
    Assoc_membersPopupComponent,
    Assoc_membersDeletePopupComponent,
    Assoc_membersDeleteDialogComponent,
    assoc_membersRoute,
    assoc_membersPopupRoute,
} from './';

const ENTITY_STATES = [
    ...assoc_membersRoute,
    ...assoc_membersPopupRoute,
];

@NgModule({
    imports: [
        DixSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Assoc_membersComponent,
        Assoc_membersDetailComponent,
        Assoc_membersDialogComponent,
        Assoc_membersDeleteDialogComponent,
        Assoc_membersPopupComponent,
        Assoc_membersDeletePopupComponent,
    ],
    entryComponents: [
        Assoc_membersComponent,
        Assoc_membersDialogComponent,
        Assoc_membersPopupComponent,
        Assoc_membersDeleteDialogComponent,
        Assoc_membersDeletePopupComponent,
    ],
    providers: [
        Assoc_membersService,
        Assoc_membersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DixAssoc_membersModule {}
