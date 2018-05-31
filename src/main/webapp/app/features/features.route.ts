import { Routes } from '@angular/router';

import {SearchAssociationsComponent} from './search-associations/search-associations.component';

export const featuresRoute: Routes = [
    {
        path: 'search-assoc',
        component: SearchAssociationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'searchAssociontion'
        }
    }
];

export const featuresPopupRoute: Routes = [

];
