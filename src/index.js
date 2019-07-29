import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyAMOON8llO7eSg2aGZ6vg-uTrjWz_hsJPY",
    authDomain: "chat-app-56967.firebaseapp.com",
    databaseURL: "https://chat-app-56967.firebaseio.com",
    projectId: "chat-app-56967",
    storageBucket: "chat-app-56967.appspot.com",
    messagingSenderId: "155027965805",
    appId: "1:155027965805:web:7b2ff9cea12d66b4"
});

const routing = (
    <Router>
        <div id='routing-container'>
            <Route path='/login' component={LoginComponent}></Route>
            <Route path='/signup' component={SignupComponent}></Route>
            <Route path='/dashboard' component={DashboardComponent}></Route>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();