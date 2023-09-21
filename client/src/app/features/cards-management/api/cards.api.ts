import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WordCard } from '@app/shared/types/wordCard';

@Injectable({
  providedIn: 'root'
})
export class CardsApi {

  constructor(private http: HttpClient) {
  }

  getCards$(listIds: string[]): Observable<WordCard[]> {
    return (this.http.get('http://127.0.0.1:3000/rest/cards', {
      params: new HttpParams().set('list_id[]', listIds.join(', '))
    }) as Observable<{ data: string }[]>).pipe(
      map(res =>
        res.map(resItem => {
          const { id, value, transcriptions, image, translations } = JSON.parse(resItem.data);
          return {
            id,
            value,
            transcriptions: transcriptions || null,
            image: image || null,
            translations: translations || null
          };
        })
      )
    );
  }
}
