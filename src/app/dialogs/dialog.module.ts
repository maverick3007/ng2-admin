import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../theme/nga.module';
import {DialogError} from './dialog-error/dialog-error.component';
import{ DialogCustomerSelect } from './dialog-customer-select/dialog-customer-select.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DIA_COMPONENTS = [
DialogError, DialogCustomerSelect]

@NgModule({
  declarations: [
    ...DIA_COMPONENTS
  ],
  imports: [
    NgaModule ,
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...DIA_COMPONENTS
  ]
})
export class DialogModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: DialogModule,
      providers: [
        
      ],
    };
  }
}