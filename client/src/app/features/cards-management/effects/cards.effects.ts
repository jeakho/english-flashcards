import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CardsApi } from '../api/cards.api';
import * as CardsManagementActions from '../state/cards.actions'

@Injectable({
  providedIn: 'root'
})
export class CardsEffect {
  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsManagementActions.loadCards),
      exhaustMap(action => this.cardsApi.getCards$(action.listIds)
        .pipe(
          map(cards => CardsManagementActions.loadCardsSuccess({ cards })),
          catchError(() => of(CardsManagementActions.loadCardsError))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private cardsApi: CardsApi
  ) {
  }
}
