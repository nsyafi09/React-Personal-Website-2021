import PostFetch from "./PostFetch";

const DeletePost = (postId) => {

    fetch('http://localhost:9999/posts/' + postId, {method:'DELETE'})
    console.log(postobj);

    return (
        <div>
            <PostFetch/>
        </div>
    );

}

export default DeletePost