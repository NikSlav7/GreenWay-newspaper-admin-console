import { useEffect } from "react";

function PostTopicEdit(props){

    useEffect(()=>{
        setValue()
    },[])

    function setValue(){
        document.getElementById(props.idName + '-textarea').value = props.content;
    }

    return (
        <div className='postDataTopic'>
            <div className="postDataTopicHeaderContainer">
                <p className="postDataTopicHeader">{props.headerName}</p>
            </div>
            <div className="postDataTopicContentContainer">
                <textarea id={props.idName + "-textarea"} className="postDataTopicContent" ></textarea>
            </div>
        </div>
    )
}
export default PostTopicEdit;