import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsViewerComponent } from './components/cards-viewer/cards-viewer.component';

import { CardsManagementComponent } from './container/cards-management.component';

const routes: Routes = [
  {
    path: '',
    component: CardsManagementComponent,
    children: [
      {
        path: '',
        component: CardsViewerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsManagementRoutingModule {
}
