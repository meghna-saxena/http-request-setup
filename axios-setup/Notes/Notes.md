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
What's actually discouraged is that you immediately call setState()  in componentDidMount() . It'll trigger an instant re-render process. It's fine to use it in some callback/ async code (as we do it in the course). It's fine because it then doesn't run instantly.


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

## Making a post selectable
- Make an onclick reference on Post component. Pass the id of the post to the handler.

```
<Post clicked={() => this.postSelectedHandler(post.id)} />
```
- We need to pass an argument here - with just this.postSelectedHandler, that's not possible, because we're not calling the method here. You could add bind(argument) at the end but that syntax can also be hard to understand, hence used the more common "wrap the to-be-executed function call in another, anonymous function" syntax.
- Set a initial selectedPostId on state as null
- Update the state inside the handler and set selectedPostId: id 
- Pass the selectedPostId to NewPost component as props
- In a class-based component (created via the class keyword), write this.props because props is a property of the object (and not received as part of a function).
- Put a condition in NewPost comp, that if id is present show a div block containing the single post you just clicked.


Note:
- Using inline style, why double curly brackets?

`let post = <p style={{ textAlign: 'center' }}></p>;`
Because the first pair (the outer pair) just tells JSX "some dynamic content is coming". Now here, I want to define inline-styles - which is simply a JS object passed to the style prop. Hence the dynamic content here is a JS object => the second pair of brackets (the inner one).



## Fetching data on update (without creating infinte loops)
- 2 kinds of component lifecycle hooks - while mounting and while updating
- Component is present, now data should be fetched once receive a new prop id
- Then ideal place for causing side-effects is - componentDidUpdate()
- One problem - if we update state there - we update the component again and therefore enter infinte loop
- Dont update state - triggers re-render

## Workflow

- Inside NewPost component, import axios
- Create componentDidUpdate() and make http request
- Not the .get('url') has to target only one single post by the id

```
 componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || this.state.loadedPost && this.state.loadedPost.id !== this.props.id) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }
```

Use condition check for setState ohterwise you'll enter infinite loops


- Why do we need the second HTTP call with specific id?
When we get the initial set of (200) posts we already get the full set of details of each of them.
However, when clicking on any of them, we call a second GET action to retrieve that specific Post but, the result contains exactly the same data as the initial one.

Wouldn't it be better to have an onClick listener on the Post which calls an upper level function that updates the FullPost with the already known data instead of making a second (and redundant) call? Or is there any specific reason why makes mandatory the need of calling this second HTTP GET?

- - What if a user navigates directly to the details. Therefore it makes sense to only get the json for the specific one. It is the general API call that should not return so much data


## POSTing data to the server
- Made an axios.post() request in New Post component


## Sending a delete request
- Used axios.delete() method and send the url with specific id to delete the post


## Handling errors locally
