import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

// types
export interface AppState {
  activeComponentTitle: string;
}

// initial state
export const initialState: AppState = {
  activeComponentTitle: '',
};

// key
export const key = 'app';

// reducer
const appReducer = createReducer(
  initialState,

  on(AppActions.setActiveComponentTitle, (state, { title }) =>
    Object.assign({}, state, { activeComponentTitle: title || undefined })
  )
);

export function reducer(state: AppState | undefined, action: Action): AppState {
  return appReducer(state, action);
}
