import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import recipeReducer from '../reducers/recipeReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      recipe: recipeReducer
    }),
    composeEnhancer(applyMiddleware(ReduxThunk)) 
  );

  return store;
}
