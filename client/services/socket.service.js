import io from 'socket.io-client';
import * as actions from '../actions/feedActions';
import messageTypes from '../constants/messageTypes';
import store from '../store';

const socket = io('ws://localhost:3000',
  { transports: ['websocket'] }
);

socket.on(messageTypes.ANSWER, data => {
  store.dispatch(actions.updateFeed(data));
});

socket.on(messageTypes.START, data => {
  store.dispatch(actions.engageFeed(data));
});

socket.on(messageTypes.END, data => {
  store.dispatch(actions.disengageFeed(data));
});

export const emitAction = action => {
  return (...args) => {
    const result = action.call(this, ...args);
    if (socket) socket.emit(result.key, { payload: result.payload, type: result.type });
    return result;
  };
};

export const emit = (key, ...args) => {
  if (socket) socket.emit(key, ...args);
}
