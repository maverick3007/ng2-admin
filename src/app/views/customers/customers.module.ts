import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CustomersComponent } from './customers.component';
import { CustomerSearchComponent} from './customer-search/customer-search.component';
import { CustomerDetailComponent} from './customer-detail/customer-detail.component';
import { CustomerDocumentsComponent} from './customer-documents/customer-documents.component';
import { routing }       from './customers.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    CustomersComponent,
    CustomerSearchComponent,
    CustomerDetailComponent,
    CustomerDocumentsComponent
  ],
  providers: [

  ]
})
export default class CustomersModule {}