import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

//request handling interceptor
axios.interceptors.request.use(request => {
    console.log(request);
    //edit request config to add some common headers
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error)
});

//response handling interceptor
axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error)
});

ReactDOM.render(<App />, document.getElementById('root'));

