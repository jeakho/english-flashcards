import { Component, Input, OnInit } from '@angular/core';
import { WordCard } from '@app/shared/types/wordCard';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.css']
})
export class WordCardComponent implements OnInit {
  @Input() wordCard!: WordCard;
  defaultImageUlr = '/assets/default-card-image.png';

  constructor() {
  }

  rotateCard(event: any): void {
    event.currentTarget.style.transform = event.currentTarget.style.transform ? '' : 'rotateY(180deg)';
  }

  ngOnInit(): void {
  }

}
