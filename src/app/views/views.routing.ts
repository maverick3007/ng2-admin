import { Routes, RouterModule } from '@angular/router';
import { Views } from './views.component';

import {AuthGuardService} from '../services';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => System.import('./login/login.module')
    },
    {
        path: 'views',
        component: Views,
        canActivate: [AuthGuardService],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
            { path: 'adveoshop', loadChildren: () => System.import('./adveoshop/adveoshop.module') },
            { path: 'customers', loadChildren: () => System.import('./customers/customers.module') },
            { path: 'documents', loadChildren: () => System.import('./documents/documents.module') },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
