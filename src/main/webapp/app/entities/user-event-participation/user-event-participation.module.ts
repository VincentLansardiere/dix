import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DixSharedModule } from '../../shared';
import {
    UserEventParticipationService,
    UserEventParticipationPopupService,
    UserEventParticipationComponent,
    UserEventParticipationDetailComponent,
    UserEventParticipationDialogComponent,
    UserEventParticipationPopupComponent,
    UserEventParticipationDeletePopupComponent,
    UserEventParticipationDeleteDialogComponent,
    userEventParticipationRoute,
    userEventParticipationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userEventParticipationRoute,
    ...userEventParticipationPopupRoute,
];

@NgModule({
    imports: [
        DixSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserEventParticipationComponent,
        UserEventParticipationDetailComponent,
        UserEventParticipationDialogComponent,
        UserEventParticipationDeleteDialogComponent,
        UserEventParticipationPopupComponent,
        UserEventParticipationDeletePopupComponent,
    ],
    entryComponents: [
        UserEventParticipationComponent,
        UserEventParticipationDialogComponent,
        UserEventParticipationPopupComponent,
        UserEventParticipationDeleteDialogComponent,
        UserEventParticipationDeletePopupComponent,
    ],
    providers: [
        UserEventParticipationService,
        UserEventParticipationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DixUserEventParticipationModule {}
