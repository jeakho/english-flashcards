import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { WordCard } from '@app/shared/types/wordCard';

@Injectable()
export class CardsService {
  private cardsSource = new BehaviorSubject<WordCard[]>([]);
  private activeCardSource = new ReplaySubject<WordCard | undefined>(1);

  constructor() {
  }

  getCards$(): Observable<WordCard[]> {
    return this.cardsSource.asObservable();
  }

  setCards(cards: WordCard[]): void {
    this.cardsSource.next(cards);
  }

  getActiveCard$(): Observable<WordCard | undefined> {
    return this.activeCardSource.asObservable();
  }

  setActiveCard(card: WordCard | undefined): void {
    this.activeCardSource.next(card);
  }
}
