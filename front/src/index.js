import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './components/App'
import Store from './components/Redux/reduxStore';
import ReactGA from 'react-ga';
ReactGA.initialize('G-RXQJQ0JWZF');
ReactGA.pageview(window.location.pathname + window.location.search);
// test
ReactDOM.hydrate(
  <Provider store={Store}>
    <BrowserRouter>
      <App>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();