import { Routes, RouterModule }  from '@angular/router';

import { AdveoShop } from './adveoshop.component';
import { AdveoOrders } from './adveoorders/adveoorders.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AdveoShop,
    children: [
      { path: 'adveoorders', component: AdveoOrders }
    ]
  }
];

export const routing = RouterModule.forChild(routes);