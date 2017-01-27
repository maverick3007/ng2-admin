import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { ArticlesComponent } from './articles.component';

import { routing }       from './articles.routing';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    ArticlesComponent,
  ],
  providers: [

  ]
})
export default class ArticlesModule {}