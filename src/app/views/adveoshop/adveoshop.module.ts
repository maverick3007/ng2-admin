import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './adveoshop.routing';
import { AdveoShop } from './adveoshop.component';
import { AdveoOrders } from './adveoorders/adveoorders.component';
//import { ChartistJsService } from './components/chartistJs/chartistJs.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    AdveoShop,
    AdveoOrders
  ],
  providers: [

  ]
})
export default class AdveoShopModule {}
