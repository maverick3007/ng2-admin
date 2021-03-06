import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing }       from './adveoshop.routing';
import { AdveoShop } from './adveoshop.component';
import { AdveoOrders } from './adveoorders/adveoorders.component';
import { CustomerSearchComponent } from '../customers/customer-search/customer-search.component';
//import { ChartistJsService } from './components/chartistJs/chartistJs.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    DropdownModule,
    ModalModule,
    
  ],
  declarations: [
    AdveoShop,
    AdveoOrders 
  ],
  providers: [

  ]
})
export default class AdveoShopModule {}
