import { useEffect, useState } from "react";
import PostTopicEdit from "./PostTopicEdit";

function PostTopicsEdit(props){
    console.log(props.postTopics)

    return(
    <div className='postDataTopicsContainer'>
       {Object.keys(props.postTopics).map(key => <PostTopicEdit idName={key} headerName={key} content={props.postTopics[key]}/>)}
    </div>
    )
}
export default PostTopicsEdit;