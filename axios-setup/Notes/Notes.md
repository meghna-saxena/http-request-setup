# HTTP-request setup
 - In react app decoupling b/w server and front-end data takes place by exchanging some JSON data. 
- Server is typically just a restful API that exposes some API endpoints where react app can send or get some data. No HTML pages are exchanged from the server. 

## Sending http request
- Javascript has XMLHttpRequest object which constructs ajax request. In react we can do that, but writing and configuring ajax req manually is cumbersome, so we use 3rd party javascript library - axios

### Why not fetch?
```
fetch(<url>)
.then(response => {
     response.json().then(jsonData => {
        console.log(json);
     })
 });

```

Axios can make coding simpler by packaging the request code. 
There are axios interceptors for handling http ajax request and responses globally.
Although fetch is more convenient but it also requires the usage of an extra polyfill which you of course can do (it's actually included automatically by create-react-app). However, axios is more broadly known option.