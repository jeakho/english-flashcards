import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CardsService } from '../../services/cards.service';
import { WordCard } from '@app/shared/types/wordCard';

@Component({
  selector: 'app-cards-viewer',
  templateUrl: './cards-viewer.component.html',
  styleUrls: ['./cards-viewer.component.css']
})
export class CardsViewerComponent implements OnInit, OnDestroy {
  cards$: Observable<WordCard[]>;
  activeCard$: Observable<WordCard | undefined>;

  private subscriptions: Subscription[] = [];

  constructor(private cardsService: CardsService) {
    this.cards$ = cardsService.getCards$();
    this.activeCard$ = cardsService.getActiveCard$();
  }

  selectCard(card: WordCard | undefined): void {
    this.cardsService.setActiveCard(card);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
