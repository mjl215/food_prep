import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//import forecastReducer from '../reducers/forecastReducer';
import authReducer from '../reducers/authReducer';
import ReduxThunk from 'redux-thunk';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer
    }),
    composeEnhancer(applyMiddleware(ReduxThunk)) 
  );

  return store;
}
