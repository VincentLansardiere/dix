import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {SearchAssociationsComponent} from './search-associations/search-associations.component';
import {CommonModule} from '@angular/common';

import { CreateAssociationComponent } from './create-association/create-association.component';
import {DixSharedModule} from '../shared';

const ENTITY_STATES = [
];

@NgModule({
    imports: [
        DixSharedModule,
        CommonModule,
        RouterModule,
        FormsModule,

    ],
    declarations: [
        SearchAssociationsComponent,
        CreateAssociationComponent,
    ],
    entryComponents: [
        SearchAssociationsComponent,
        CreateAssociationComponent
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturesModule {}
