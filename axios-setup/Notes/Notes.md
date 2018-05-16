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


## Rendering fetched data
- Initialise state and set `state = {posts:[]}`
- Update state by calling setState inside axios .then() block - `this.setState({posts: reponse.data})`
- If we call setState outside, the data wouldnt be fetched yet since axios runs async to application
- Now render the array of posts by creating a constant, then mapping thru array of posts, which takes up single post and  returning Post component with its title

```
const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} />;
        });
```

- Using async/await:
You can also create this method using the ES8 Async/Await syntax. Going forward this will replace promises for the most part.

```
async componentDidMount() {
 const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
 this.setState({posts: response.data});
 }
```

It won't run setState until the axios.get funtion returns.


- Note:
In componentDidMount,state shouldn't be updated. However, we are fetching data and setState here:
we're calling setState() here once the data returned from the Http request. It's correct because a Http request is a side effect and these should be done in componentDidMount. Note that we don't call setState directly in componentDidMount. We call it in the then() block which will be executed once the data is there, not directly when the component mounts.

Still, it will cause a re-render but here, that's of course intended, we want to output our newly fetched data. We only want to avoid calling setState in componentDidMount() because we don't want to trigger unintended re-renders.

It won't cause an infinite loop because componentDidMount() is only executed once. So all it can possibly cause is one extra render cycle.


## Transforming fetched data
- For real-world app, you send some query param to backend to restrict the maount of data to be fetched.   
- Otherwise use slice() method to restrict the amount of posts to be fetched.
- For transforming data, let's say we want to add author property to posts.
- We map thru posts, and for every single post we return an object, distribute the old post by spread operator and add the new author property

```
componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Meggie'
                    };
                })
                this.setState({ posts: updatedPosts })
            });
    }
```