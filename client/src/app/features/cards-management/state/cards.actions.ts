import { createAction, props } from '@ngrx/store';
import { WordCard } from '@app/shared/types/wordCard';

export const loadCards = createAction('[Cards Management Page] Load', props<{ listIds: string[] }>());
export const loadCardsSuccess = createAction('[Cards Management API] Load Success', props<{ cards: WordCard[] }>());
export const loadCardsError = createAction('[Cards Management API] Load Error');
