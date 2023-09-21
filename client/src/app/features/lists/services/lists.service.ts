import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ListItem } from '@app/shared/types/list-item';

@Injectable()
export class ListsService {
  private listsSource = new BehaviorSubject<ListItem[]>([]);
  private selectedListTitleSource = new Subject<string>();
  private activeListSource = new BehaviorSubject<ListItem | null>(null);

  constructor() {
  }

  getLists$(): Observable<ListItem[]> {
    return this.listsSource.asObservable();
  }

  setLists(lists: ListItem[]): void {
    this.listsSource.next(lists);
  }

  createList$(title: string): any {
    
  }

  getSelectedListTitle$(): Observable<string> {
    return this.selectedListTitleSource.asObservable();
  }

  setActiveListTitle(title: string): void {
    this.selectedListTitleSource.next(title);
  }

  // getActiveList$(): Observable<CardsList> | null {
  //   return this.activeListSource.asObservable();
  // }
  //
  // setActiveList(list: CardsList): void {
  //   this.activeListSource.next(list);
  // }
}
