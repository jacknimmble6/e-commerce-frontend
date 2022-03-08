import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import { MyContextProvider } from './useContext'
import reducers from './reducers/index'
import thunk from 'redux-thunk'
import { devToolsEnhancer } from '@redux-devtools/extension'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
import localforage from 'localforage'

const persistConfig = {
  key: 'root',
  storage: localforage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = compose(applyMiddleware(thunk), devToolsEnhancer({ trace: true }))(createStore)(persistedReducer)

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <MyContextProvider>
      <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </React.StrictMode>
    </MyContextProvider>
  </Provider>,
  document.getElementById('root')
);
