import React, {useState} from 'react';
import './NewPost.css';

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const postobj = {title, body};
        fetch('http://localhost:9999/posts/', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(postobj)
        })
        console.log(postobj);
    }

    return (
        <div class="container">
            <form>
                <div class="header1">
                    <div class="header1"><h1>Add Story</h1></div>
                </div>
                <div class="post">
                    <div class="header2">
                        <div class="att">Title</div>
                        <input type="text" class="input1" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div class="header2">
                        <div class="att">Story</div>
                        <input type="text" class="input2" required value={body} onChange={(e) => setBody(e.target.value)}/>
                    </div>
                    <div class="header1">
                        <button type="button" class="submitButton" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewPost;