import * as types from '../constants/feedActionTypes';

export const updateFeed = (data) => ({
  type: types.UPDATE_FEED,
  payload: data,
});

export const expireFeed = (data) => ({
  type: types.EXPIRE_FEED,
  payload: data,
});

export const engageFeed = (data) => ({
  type: types.ENGAGE_FEED,
  payload: data,
});

export const disengageFeed = (data) => ({
  type: types.DISENGAGE_FEED,
  payload: data,
});
