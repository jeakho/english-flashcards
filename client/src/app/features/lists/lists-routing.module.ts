import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsManagementComponent } from './components/lists-management/lists-management.component';

import { ListsComponent } from './container/lists.component';

const routes: Routes = [
  {
    path: '', component: ListsComponent, children: [
      {
        path: '',
        // loadChildren: () => import ('../lists-management/lists-management.module').then(m => m.ListsManagementModule)
        component: ListsManagementComponent
      },
      {
        path: ':listid',
        loadChildren: () => import('../cards-management/cards-management.module').then(m => m.CardsManagementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule {
}
