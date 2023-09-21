import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';
import { SharedModule } from '@app/shared/shared.module';

// Routing Module
@NgModule({
  declarations: [SelectionComponent],
  imports: [
    SharedModule,
    SelectionRoutingModule
  ]
})
export class SelectionModule { }
