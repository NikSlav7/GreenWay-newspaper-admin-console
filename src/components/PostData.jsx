import '../css/PostPage.css'
import PostTopics from './PostTopics';
function PostData(props){

    return (
        <div className="postDataContainer">
            <div className='postDataTitleContainer'>
                <input className='postDataTitle' type='text' placeholder='Title' id='title-textarea'/>
            </div>
            <div className='postDataSubTitleAndTimeContainer'>
                <div className='postDataSubTitleContainer'>
                    <input className='postDataSubTitle' placeholder='Subtitle' id='subtitle-textarea'/>
                </div>
                <div className='postDataTimeContainer'>
                    <input className='postDataTime' placeholder='Time' id='time-textarea'/>
                </div>
            </div>
            <PostTopics postTopics={props.postTopics}/>
        </div>
    )
}
export default PostData;