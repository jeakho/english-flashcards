import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AppSelectors from '@app/state/app.selectors';
import * as ListsSelectionSelectors from '@app/features/selection/state/selection.selectors';
import * as ListsSelectionActions from '@app/features/selection/state/selection.actions';

@Component({
  selector: 'app-list-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'wrapper';

  activeComponentTitle$: Observable<string>;
  listTitles$: Observable<string[]>;

  constructor(
    private store: Store
  ) {
    this.activeComponentTitle$ = store.select(AppSelectors.activeComponentTitle);
    this.listTitles$ = store.select(ListsSelectionSelectors.listTitles);
  }

  ngOnInit(): void {
    this.store.dispatch(ListsSelectionActions.loadListTitles());
  }

}
