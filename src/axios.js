import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorisation'] = 'AUTH TOKEN FROM INSTANCE'; //overrides the defaults authorisation

//instance.interceptors.request...

export default instance;