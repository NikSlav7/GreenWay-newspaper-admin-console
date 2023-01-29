import '../css/FoundProfiles.css'
import InterestsEdit from './InterestsEdit';
function FoundProfileEditDetails(props){
    return(
        <div className="found-profile-edit-details-container" id={props.id + '-edit-details-container'} >
            <InterestsEdit userInterests={props.interests}/>
            <div className='details-save-button-container'>
                <button className='details-save-button'>Save</button>
            </div>
        </div>
    )
}
export default FoundProfileEditDetails;