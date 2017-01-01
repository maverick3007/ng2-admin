import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CustomersComponent } from './customers.component';
import { routing }       from './customers.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    CustomersComponent,

  ],
  providers: [

  ]
})
export default class CustomersModule {}