import { Routes } from '@angular/router';

import {SearchAssociationsComponent} from './search-associations/search-associations.component';
import {CreateAssociationComponent} from './create-association/create-association.component';

export const featuresRoute: Routes = [
    {
        path: 'search-assoc',
        component: SearchAssociationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'searchAssociation'
        }
    }
];

export const featuresPopupRoute: Routes = [
    {
        path: 'create-assoc',
        component: CreateAssociationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'createAssociation'
        }
    }
];
