import * as types from '../constants/feedActionTypes';
import produce from 'immer';

const initialState = { };

export default produce((draft = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FEED:
      console.log('action', action.payload);
      if (!draft[action.payload.username]) {
        draft[action.payload.username] = {
          isOver: false,
          results: [action.payload.isCorrect],
        };
      } else draft[action.payload.username].results.push(action.payload.isCorrect);
      break;
    case types.EXPIRE_FEED:
      draft[action.payload].shift();
      break;
    case types.ENGAGE_FEED:
      draft[action.payload] = {
        isOver: false,
        results: [], 
      };
      break;
    case types.DISENGAGE_FEED:
      draft[action.payload].isOver = true;
      break;
  }
  return draft;
});
