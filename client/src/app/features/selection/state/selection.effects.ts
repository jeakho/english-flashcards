import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ListsApi } from '@app/features/lists/api/lists.api';
import * as ListsSelectionActions from './selection.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionEffects {
  loadListTitles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsSelectionActions.loadListTitles),
      exhaustMap(() =>
        this.listsApi.getListTitles$()
          .pipe(
            map(listTitles => ListsSelectionActions.addListTitles({ listTitles })),
            catchError(() => EMPTY)
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private listsApi: ListsApi
  ) {
  }
}
