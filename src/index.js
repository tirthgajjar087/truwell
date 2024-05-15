import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './reducer/Store';
import { CableProvider } from './Provider/Context';
const CableApp = {};
// CableApp.cable = actionCable.createConsumer(APP_CABLE_URL);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <CableProvider>
      <App />
    </CableProvider>
  </Provider>


);

export const APP_URL = "http://localhost:3000"
export const APP_CABLE_URL = "http://192.168.0.115:3000/cable";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
