import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'learn' },
  { path: 'learn', loadChildren: () => import('./features/lists/lists.module').then(m => m.ListsModule) },
  { path: 'lists', loadChildren: () => import('./features/selection/selection.module').then(m => m.SelectionModule) },
  { path: '**', redirectTo: 'learn' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
