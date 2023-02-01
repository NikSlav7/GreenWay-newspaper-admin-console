import { useEffect, useState } from "react";
import PostTopic from "./PostTopic";

function PostTopics(props){

    return(
    <div className='postDataTopicsContainer'>
       {props.postTopics.map((topic, ind) => <PostTopic pos={ind} insertpic={props.insertpic} headerName={topic} idName={topic}/>)}
    </div>
    )
}
export default PostTopics;