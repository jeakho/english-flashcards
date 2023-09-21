import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ListsActions from '../state/lists.actions';
import * as ListsSelectors from '../state/lists.selectors';

import * as AppActions from '@app/state/app.actions';
import { ListsService } from '../services/lists.service';
import { ListItem } from '@app/shared/types/list-item';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [ListsService]
})
export class ListsComponent implements OnInit, OnDestroy {
  @HostBinding('attr.class') cssClass = 'wrapper';

  lists$: Observable<ListItem[]>;
  listTitles$: Observable<string[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private listsManagementService: ListsService
  ) {
    this.lists$ = this.store.select(ListsSelectors.selectListEntities);
    this.listTitles$ = this.store.select(ListsSelectors.selectListTitles);
  }

  setActiveComponentTitle(componentTitle: string) {
    this.store.dispatch(AppActions.setActiveComponentTitle({ title: componentTitle }))
  }

  ngOnInit(): void {
    this.subscriptions.push(
      /* outgoing data flow */
      this.lists$.subscribe(lists =>
        this.listsManagementService.setLists(lists)
      ),

      /* ingoing data flow */
      this.listsManagementService.getSelectedListTitle$().subscribe(this.setActiveComponentTitle.bind(this))
    );

    this.store.dispatch(ListsActions.loadLists());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
