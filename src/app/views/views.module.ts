import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './views.routing';
import { NgaModule } from '../theme/nga.module';

import { Views } from './views.component';

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Views]
})
export class ViewsModule {
}
