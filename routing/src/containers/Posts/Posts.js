import React, { Component } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import Post from '../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4); //only fetch 4 posts
                const updatedPosts = posts.map(post => {
                    return {
                        ...post, //distribute the properties of the posts we got from the server
                        author: 'Meggie' //added another property
                    }
                });
                // this.setState({ posts: response.data });//data property has an array of posts
                this.setState({ posts: updatedPosts })
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Link to={'/' + post.id} key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                    </Link>
                );
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;