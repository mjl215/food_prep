import React, { useEffect } from 'react';

import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { setUser } from './actions/AuthActions';

const store = configureStore();


const  App = () => {

  useEffect(() => {
    store.dispatch(setUser());
  }, []);

  return (
    <Provider store={store} >
      <AppRouter />
    </Provider>
  );
}

export default App;
