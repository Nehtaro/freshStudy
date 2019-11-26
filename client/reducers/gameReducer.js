import * as types from '../constants/gameActionTypes';
import produce from 'immer';

const initialState = {
  isGameOver: false,
  isPlaying: false,
  isPaused: false,
  activeCardIndex: 0,
  answerHistory: [],
  cards: [],
  allHistory: [],
};

export default produce((draft = initialState, action) => {
  switch (action.type) {
    case types.START_NEW_GAME:
      draft.isGameOver = false;
      draft.isPlaying = true;
      draft.isPaused = false;
      draft.activeCardIndex = 0;
      draft.answerHistory = [];
      draft.cards = action.payload;
      break;
    case types.END_GAME:
      if (action.payload) draft.allHistory = action.payload;
      draft.isGameOver = true;
      draft.isPlaying = false;
      draft.isPaused = false;
      draft.activeCardIndex = 0;
      draft.answerHistory = [];
      draft.cards = [];
      break;
    case types.PAUSE_GAME:
      draft.isPlaying = false;
      draft.isPaused = true;
      break;
    case types.RESUME_GAME:
      draft.isPlaying = true;
      draft.isPaused = false;
      break;
    case types.ATTEMPT_ANSWER:
      draft.activeCardIndex += 1;
      if (draft.activeCardIndex >= draft.cards.length) draft.isGameOver = true;
      draft.answerHistory.push(action.payload);
      break;
    case types.RETURN_TO_MAIN_MENU:
      draft.isPlaying = false;
      break;
    case types.UPDATE_HISTORY:
      draft.allHistory = action.payload;
      break;
  }
  return draft;
});
