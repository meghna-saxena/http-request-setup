import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post';
import FullPost from '../../components/FullPost';
import NewPost from '../../components/NewPost';
import './Blog.css';

class Blog extends Component {
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            console.log(response);
        })
    }
    
    render () {
        return (
            <div>
                <section className="Posts">
                    <Post />
                    <Post />
                    <Post />
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;