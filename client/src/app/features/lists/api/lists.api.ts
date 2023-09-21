import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, tap } from 'rxjs';
import { ListItem } from '@app/shared/types/list-item';

@Injectable({
  providedIn: 'root'
})
export class ListsApi {

  constructor(private http: HttpClient) {
  }

  getLists$(): Observable<ListItem[]> {
    return (this.http.get('http://127.0.0.1:3000/rest/lists') as Observable<{ data: string }[]>).pipe(
      map(res =>
        res.map(resItem => {
          const listItem: ListItem = JSON.parse(resItem.data);
          return listItem;
        })
      )
    );
  }

  getListTitles$(): Observable<string[]> {
    return (this.http.get('http://127.0.0.1:3000/rest/listTitles') as Observable<{ data: string }[]>).pipe(
      map(res =>
        res.map(resItem => JSON.parse(resItem.data))
      )
    );
  }

  createList$(title: string): Observable<ListItem> {
    return (this.http.post('http://127.0.0.1:3000/rest/list', { title }) as Observable<{ data: string }>).pipe(
      map(res => {
        const listItem: ListItem = JSON.parse(res.data);
        return listItem;
      })
    );
  }

  deleteList$(id: number): Observable<any> {
    return (this.http.delete('http://127.0.0.1:3000/rest/list?id=' + id) as Observable<any>);
  }
}
