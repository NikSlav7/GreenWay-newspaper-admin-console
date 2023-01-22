import { useEffect, useState } from "react";
import PostTopic from "./PostTopic";

function PostTopics(props){

    return(
    <div className='postDataTopicsContainer'>
       {props.postTopics.map(topic => <PostTopic headerName={topic} idName={topic}/>)}
    </div>
    )
}
export default PostTopics;