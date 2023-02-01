
function PostTopic(props){


    function removeError(){
        document.getElementById('postDataTopic' + props.pos).classList.remove('error')
    }

    

    return (
        <div className='postDataTopic' id={'postDataTopic' + props.pos} onClick={() => removeError()}>
            <div className="postDataTopicHeaderContainer">
                <p className="postDataTopicHeader">{props.headerName}</p>
                <div className='postDataTopicAddPictureButtonContainer'>
                    <button className="postDataTopicAddPictureButton" onClick={()=>{props.insertpic(true, props.idName)}}>Add pic</button>
                </div>
            </div>
            <div className="postDataTopicContentContainer">
                <textarea id={props.idName + "-textarea"} className="postDataTopicContent"></textarea>
            </div>
        </div>
    )
}
export default PostTopic;