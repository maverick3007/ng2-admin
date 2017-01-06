import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { LiveSales } from './liveSales/liveSales.component';
import { routing }       from './dashboard.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Dashboard,
    LiveSales
  ],
  providers: [
  ]
})
export default class DashboardModule {}