import * as types from '../constants/gameActionTypes';
import messageTypes from '../constants/messageTypes';
import emit from '../services/socket.service';

export const startNewGame = () => (dispatch, getState) => {
  const state = getState();
  fetch('/questions')
    .then(res => res.json())
    .then(data => {
      if (!state.user.isLoggedIn) {
        dispatch({
          type: types.START_NEW_GAME,
          payload: data,
        });
        return;
      }
      emit(messageTypes.START, {
        username: state.user.userData.username,
        ts: Date.now(),
      });
      dispatch({
        type: types.START_NEW_GAME,
        payload: data,
      });
    })
    .catch(console.error);
};

export const endGame = () => (dispatch, getState) => {
  const state = getState();
  if (!state.user.isLoggedIn) {
    dispatch({ type: types.END_GAME });
    return;
  }
  const gameInfo = {
    username: state.user.userData.username,
    numQs: state.game.answerHistory.length,
    numCorrect: state.game.answerHistory.reduce((acc, cur) => acc + cur),
  };
  emit(messageTypes.END, {
    ...gameInfo,
    ts: Date.now(),
  });
  const body = JSON.stringify(gameInfo);
  const options = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch('/results', options)
    .then(res => res.json())
    .then(data => dispatch({
      type: types.END_GAME,
      payload: data,
    }))
    .catch(console.error);
};

export const getHistory = () => dispatch => {
  fetch('/results')
    .then(res => res.json())
    .then(data => dispatch({
      type: types.UPDATE_HISTORY,
      payload: data,
    }))
    .catch(console.error);
};

export const pauseGame = () => ({
  type: types.PAUSE_GAME,
});

export const resumeGame = () => ({
  type: types.RESUME_GAME,
});

export const attemptAnswer = (isCorrect) => (dispatch, getState) => {
  const state = getState();
  if (state.user.isLoggedIn) {
    emit(messageTypes.ANSWER, {
      isCorrect,
      username: state.user.userData.username,
      ts: Date.now(),
    });
  }
  dispatch({
    type: types.ATTEMPT_ANSWER,
    payload: isCorrect,
  });
}

export const returnToMainMenu = () => ({
  type: types.RETURN_TO_MAIN_MENU
});
