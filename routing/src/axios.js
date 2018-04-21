import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'https://jsonplaceholder.typicode.com'
// });

//overrides the defaults authorisation
// instance.defaults.headers.common['Authorisation'] = 'AUTH TOKEN FROM INSTANCE'; 

// Another way of writing
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
    'Authorization' : 'AUTH TOKEN FROM INSTANCE'
    }
    });

//instance.interceptors.request...

export default instance;