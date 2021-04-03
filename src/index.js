import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom"
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import reducers from './Redux/Reducers';
import socket from "./Redux/Middlewares/socketMiddleware";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Provider store={createStore(reducers, applyMiddleware(socket))}>
              <App />
          </Provider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
