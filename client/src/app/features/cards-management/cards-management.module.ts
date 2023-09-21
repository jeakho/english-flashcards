import { NgModule } from '@angular/core';

import { CardsManagementRoutingModule } from './cards-management-routing.module';
import { CardsManagementComponent } from './container/cards-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardsViewerComponent } from './components/cards-viewer/cards-viewer.component';
import { StoreModule } from '@ngrx/store';

import * as fromCardsManagement from './state/cards.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CardsEffect } from './effects/cards.effects';
import { CardsControlComponent } from './components/cards-control/cards-control.component';
import { WordCardComponent } from './components/word-card/word-card.component';


@NgModule({
  declarations: [CardsManagementComponent, CardsViewerComponent, CardsControlComponent, WordCardComponent],
  imports: [
    SharedModule,
    CardsManagementRoutingModule,
    StoreModule.forFeature(fromCardsManagement.featureKey, fromCardsManagement.reducer),
    EffectsModule.forFeature([CardsEffect])
  ]
})
export class CardsManagementModule {
}
