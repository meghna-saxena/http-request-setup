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

// Setting a default global configuration for axios:
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
axios.defaults.headers.common['Authorisation'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(<App />, document.getElementById('root'));

