import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppRouter from './routers/AppRouter';
import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDYUz-cjZV4fTjluyuYzSIajlN6r93AuYQ",
  authDomain: "andres-project-702da.firebaseapp.com",
  databaseURL: "https://andres-project-702da.firebaseio.com",
  projectId: "andres-project-702da",
  storageBucket: "andres-project-702da.appspot.com",
  messagingSenderId: "1060916258928",
  appId: "1:1060916258928:web:0d1767d57f6095e0026cb5",
  measurementId: "G-9PZ7FTPHRK"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
