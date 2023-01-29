import '../css/FoundProfiles.css'
import InterestsEdit from './InterestsEdit';
function FoundProfileEditDetails(props){
    return(
        <div className="found-profile-edit-details-container" id={props.id + '-edit-details-container'} >
            <InterestsEdit userInterests={props.interests} id={props.id}/>
            <div className='details-save-button-container'>
                <button onClick={() => props.save(props.id + '-edit-details-select')} className='details-save-button'>Save</button>
            </div>
        </div>
    )
}
export default FoundProfileEditDetails;