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


### Fake server data
Using https://jsonplaceholder.typicode.com/ to get array of dummy posts


## Workflow
- In blog component, render dynamically generated lists of posts fetched from server


Note: Ideal place for http request
componentDidMount() is ideal for causing side-effects. State shouldnt be updated there, since it triggers re-render. However, we would still pdate state here, once http req gets some new data cause we want to update the page. So here it is a wanted behavior.  

- Using axios get('url') method inside componentDidMount(). In axios.get(), the first arg is url, optional second arg for configuring request
- Get req happens asynchronously
- Axios therefore use promises, a default js object introduced with ES6.
- So axios use promises, and get() returns a promise, so we can change .then() on it.
- .then() is a method which takes func as a input and this func gets executed once promise resolves, i.e the data from the server is present.
- .then(response => console.log(response));


Note:

### Async/await
Instead of using promises like
```
 componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            console.log(response);
        })
    }
```

replace by:

```
asyn componentDidMount() {
     const data = await axios.get('https://jsonplaceholder.typicode.com/posts')
}
```


## Rendering fecthed data
- Initialise state and set `state = {posts:[]}`
- Update state by calling setState inside axios .then() block - `this.setState({posts: reponse.data})`
- If we call setState outside, the data wouldnt be fetched yet since axios runs async to application
- Now render the array of posts by creating a constant, then mapping thru array of posts, which takes up single post and  returning Post component with its title

```
const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} />;
        });
```