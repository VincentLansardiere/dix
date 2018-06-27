import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DixUserProfileModule } from './user-profile/user-profile.module';
import { DixAssociationModule } from './association/association.module';
import { DixEventModule } from './event/event.module';
import { DixCategoryModule } from './category/category.module';
import { DixUserEventParticipationModule } from './user-event-participation/user-event-participation.module';
import { DixAssociationUserRoleModule } from './association-user-role/association-user-role.module';
import { DixAssoc_membersModule } from './assoc-members/assoc-members.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DixUserProfileModule,
        DixAssociationModule,
        DixEventModule,
        DixCategoryModule,
        DixUserEventParticipationModule,
        DixAssociationUserRoleModule,
        DixAssoc_membersModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DixEntityModule {}
