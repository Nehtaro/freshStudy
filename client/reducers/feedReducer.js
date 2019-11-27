import * as types from '../constants/feedActionTypes';
import produce from 'immer';

const initialState = { };

export default produce((draft = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_FEED:
      if (draft && draft[payload.username] && draft[payload.username].results) {
        draft[payload.username].results.push(
          {
            isCorrect: payload.isCorrect,
            ts: payload.ts,
          });
      }
      break;
    case types.ENGAGE_FEED:
      draft[payload.username] = {
        results: [],
        start: payload.ts,
      };
      break;
    case types.DISENGAGE_FEED:
      draft[payload.username].end = payload.ts;
      draft[payload.username].score = `${payload.numCorrect} out of ${paylod.numQs}`;
      break;
    case types.EXPIRE_FEED:
        draft[payload].results.shift();
        break;
  }
  return draft;
});
