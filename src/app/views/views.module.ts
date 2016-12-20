import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './views.routing';
import { NgaModule } from '../theme/nga.module';

import { Views } from './views.component';

import { ConstantsService } from '../services';
import { AuthenticationService } from '../services';
import { AuthGuardService } from '../services';


@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Views],
  providers: [ConstantsService,AuthenticationService,AuthGuardService]
})
export class ViewsModule {
}
