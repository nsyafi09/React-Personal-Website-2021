import { getByTitle } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import './stories.css';

const Stories = () => {
    const [posts, setPosts] = useState(null)

    function fetchData() {
        fetch('http://localhost:9999/posts/')
        .then(res => {
            return res.json();
        })
        .then(respdata => {
            console.log(respdata)
            setPosts(respdata) 
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    function deletePost(postid) {
        fetch('http://localhost:9999/posts/'+ postid, {method:'DELETE'})
        .then(() => {
            fetchData();
        });
    }
    
    const ListPost = ({posts}) => {
        return (
            <div>
                {posts.map(post => (
                    <div key={post.id} id={post.id}>
                        <div class="story">Title: {post.title}<br></br>Story: {post.body}</div>
                        <button class="submitButton" onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                ))}
            </div>
        )
    }
    
    return (
        <div>
            {posts && <ListPost posts={posts} />}
        </div>
    );
}

export default Stories;