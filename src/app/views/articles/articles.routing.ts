import { Routes, RouterModule }  from '@angular/router';

import { ArticlesComponent } from './articles.component';

//import { ArticleDetailsComponent} from './article-details/article-details.component'

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    children: [
      //{ path: 'articledetails/:id', component: ArticleDetailsComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);