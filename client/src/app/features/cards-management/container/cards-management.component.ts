import { Component, HostBinding, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as CardsManagementActions from '../state/cards.actions';
import * as CardsManagementSelectors from '../state/cards.selectors';
import * as CoreActions from '@app/state/app.actions';

import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CardsService } from '../services/cards.service';
import { WordCard } from '@app/shared/types/wordCard';

@Component({
  selector: 'app-cards-management',
  templateUrl: './cards-management.component.html',
  styleUrls: ['./cards-management.component.css'],
  providers: [CardsService]
})
export class CardsManagementComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') cssClass = 'wrapper';

  currentListId$: Observable<string>;
  cards$: Observable<WordCard[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cardsService: CardsService
  ) {
    this.currentListId$ = route.params.pipe(
      map(params => params['listid'])
    );

    this.cards$ = this.store.select(CardsManagementSelectors.selectCardEntities);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.currentListId$.subscribe(listId => {
        this.store.dispatch(CardsManagementActions.loadCards({ listIds: [listId] }));
        setTimeout(() => this.store.dispatch(CoreActions.setActiveComponentTitle({ title: listId })));
      }),

      this.cards$.subscribe(cards => {
        this.cardsService.setCards(cards);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
