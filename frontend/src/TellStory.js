import React, {useState} from 'react';

const TellStory = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = () => {
        const postobj = {title, body};
        fetch('http://localhost:9999/stories/', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(postobj)
        })
        console.log(postobj);
    }

    return (
        <div class="form">
            <form>
                <div class="post">
                    <div class="addStory">Add Story</div>
                </div>
                <div class="post">
                    <div class="title">
                        <div class="att">Title</div>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div class="tale">
                        <div class="att">Title</div>
                        <input type="text" required value={body} onChange={(e) => setBody(e.target.value)}/>
                    </div>
                    <div class="confirmation">
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TellStory;