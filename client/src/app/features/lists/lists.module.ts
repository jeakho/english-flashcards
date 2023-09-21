import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './container/lists.component';
import { SharedModule } from 'src/app/shared/shared.module';
import * as fromListsManagement from './state/lists.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ListsEffect } from './effects/lists.effects';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListsManagementComponent } from './components/lists-management/lists-management.component';
import { CreateListDialogComponent } from './components/create-list-dialog/create-list-dialog.component';


@NgModule({
  declarations: [ListsComponent, ListsManagementComponent, ListItemComponent, CreateListDialogComponent],
  imports: [
    SharedModule,
    ListsRoutingModule,
    StoreModule.forFeature(fromListsManagement.featureKey, fromListsManagement.reducer),
    EffectsModule.forFeature([ListsEffect])
  ]
})
export class ListsModule {
}
