import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
// let store;
// import('redux').then(({ createStore, applyMiddleware, compose }) => {
//   store = createStore(reducers, compose(
//     applyMiddleware(
//       thunk,
//     ),
//   ));
// });

// const store = createStore(reducers, composeWithDevTools(
//   applyMiddleware(
//     thunk,
//   ),
// ));

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
));

export default store;
