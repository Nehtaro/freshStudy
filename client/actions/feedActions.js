import * as types from '../constants/feedActionTypes';

export const updateFeed = (data) => ({
  type: types.UPDATE_FEED,
  payload: data,
});

export const expireFeed = (username) => ({
  type: types.EXPIRE_FEED,
  payload: username,
});

export const engageFeed = (username) => ({
  type: types.ENGAGE_FEED,
  payload: username,
});

export const disengageFeed = (username) => ({
  type: types.DISENGAGE_FEED,
  payload: username,
});
