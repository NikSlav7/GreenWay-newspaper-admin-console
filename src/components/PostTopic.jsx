
function PostTopic(props){

    return (
        <div className='postDataTopic'>
            <div className="postDataTopicHeaderContainer">
                <p className="postDataTopicHeader">{props.headerName}</p>
            </div>
            <div className="postDataTopicContentContainer">
                <textarea id={props.idName + "-textarea"} className="postDataTopicContent"></textarea>
            </div>
        </div>
    )
}
export default PostTopic;