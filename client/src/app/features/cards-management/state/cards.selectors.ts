import { createSelector } from "@ngrx/store";
import { featureKey } from "./cards.reducer";

const selectCards = (state: any) => state[featureKey];

export const selectCardEntities = createSelector(
  selectCards,
  (state: any) => state.entities
)
