import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {SearchAssociationsComponent} from './search-associations/search-associations.component';

const ENTITY_STATES = [
];

@NgModule({
    imports: [
    ],
    declarations: [
        SearchAssociationsComponent,
    ],
    entryComponents: [
        SearchAssociationsComponent,
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturesModule {}
