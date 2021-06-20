import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from 'app/store';
import AppProviders from 'contexts/AppProviders';

import App from './app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <AppProviders>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <App />
            </MuiPickersUtilsProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </AppProviders>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
