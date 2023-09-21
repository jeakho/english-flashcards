import { Component, Input, OnChanges, OnInit, Output, SimpleChange, EventEmitter, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { noop, sample } from 'lodash';
import { combineLatest, empty, interval, Observable, of, Subject, Subscription } from 'rxjs';
import { map, mapTo, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { InstantlyAppearedErrorStateMatcher } from '@app/shared/error-state-matchers/instantlyAppearedErrorStateMatcher';
import { WordCard } from '@app/shared/types/wordCard';

@Component({ 
  selector: 'app-cards-control',
  templateUrl: './cards-control.component.html',
  styleUrls: ['./cards-control.component.css']
})
export class CardsControlComponent implements OnInit, OnChanges, OnDestroy {
  @Input() cards!: WordCard[];
  @Output() cardSelected = new EventEmitter<WordCard | undefined>();

  private cards$ = new Subject<WordCard[]>();
  private cardsAutoEmitter$: Observable<WordCard | undefined>;
  filteredCards$: Observable<WordCard[]>;
  selectedCard$ = new Subject<WordCard>();
  filterRule$: Observable<string>;
  isTimerActive$: Observable<boolean>;
  isThereAnyFilteredCard$: Observable<boolean>;

  form: FormGroup;
  instantErrorsStateMatcher = new InstantlyAppearedErrorStateMatcher();

  private cardsFilter = '';
  private isTimerActive = false;

  private subscriptions: Subscription[] = [];

  private getFormControlByName(name: string): AbstractControl {
    const formControlNames = Object.keys(this.form.controls);

    if (!formControlNames.includes(name)) {
      throw new Error('Invalid form control name!');
    }
    return this.form.get(name) as AbstractControl;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cardsFilter: [this.cardsFilter],
      isTimerActive: [this.isTimerActive]
    });

    this.filterRule$ = this.getFormControlByName('cardsFilter').valueChanges.pipe(startWith(this.cardsFilter));

    this.filteredCards$ = combineLatest([
      this.cards$,
      this.filterRule$
    ]).pipe(
      map(cardsWithFilter => cardsWithFilter[0].filter(card => card.value.startsWith(cardsWithFilter[1])))
    );

    this.isThereAnyFilteredCard$ = this.filteredCards$.pipe(
      map(cards => !!cards.length)
    );

    this.isTimerActive$ = this.getFormControlByName('isTimerActive').valueChanges.pipe(startWith(this.isTimerActive));

    this.cardsAutoEmitter$ = combineLatest([
      this.filteredCards$,
      this.isTimerActive$
    ]).pipe(
      switchMap(filteredCardValuesWithTimerActiveFlag => filteredCardValuesWithTimerActiveFlag[1] ?
        interval(3000).pipe(
          mapTo(filteredCardValuesWithTimerActiveFlag[0]),
          mergeMap(cardValues => cardValues.length ? of(sample(cardValues)) : empty())
        )
        : empty()
      )
    );
  }

  clearFilter(): void {
    this.getFormControlByName('cardsFilter').setValue('');
  }

  selectCard(card: WordCard): void {
    this.selectedCard$.next(card);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.isThereAnyFilteredCard$.subscribe(value => {
        if (!value) {
          this.getFormControlByName('cardsFilter').setErrors({ filteredCardsSetEmpty: true });
        }
      }),

      this.selectedCard$.subscribe(card => this.cardSelected.emit(card)),

      this.cardsAutoEmitter$.subscribe(card => card ? this.selectCard(card) : noop())
    );
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    this.getFormControlByName('isTimerActive').setValue(false);
    this.clearFilter();

    if (changes.hasOwnProperty('cards')) {
      this.cards$.next(changes['cards'].currentValue);

      setTimeout(() => {
        this.selectCard(changes['cards'].currentValue?.[0]);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
