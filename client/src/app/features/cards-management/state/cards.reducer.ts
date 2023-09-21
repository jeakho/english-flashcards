import { Action, createReducer, on } from '@ngrx/store';
import * as CardsManagementActions from './cards.actions';
import { WordCard } from '@app/shared/types/wordCard';

// types
export interface CardsState {
  ids: number[];
  entities: WordCard[];
}

// initial state
export const initialState: CardsState = {
  ids: [],
  entities: []
};

// key
export const featureKey = 'cards';

// tslint:disable-next-line:variable-name
const _cardsManagementReducer = createReducer(
  initialState,

  on(CardsManagementActions.loadCardsSuccess, (state, { cards: entities }) =>
    Object.assign({}, state, { entities, ids: entities.map(card => card.id) })
  ),

  on(CardsManagementActions.loadCardsError, state => {
    console.log('CARDS LOADING ERROR!!!');
    return state;
  })
);

export function reducer(state: CardsState | undefined, action: Action): CardsState {
  return _cardsManagementReducer(state, action);
}
