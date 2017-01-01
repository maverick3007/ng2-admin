import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import {DialogError} from './dialog-error/dialog-error.component';


const DIA_COMPONENTS = [
DialogError]

@NgModule({
  declarations: [
    ...DIA_COMPONENTS
  ],
  imports: [
    CommonModule,
    ModalModule
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