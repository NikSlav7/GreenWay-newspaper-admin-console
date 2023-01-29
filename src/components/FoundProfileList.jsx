import '../css/FoundProfiles.css'
import FoundProfile from './FoundProfile';
function FoundProfileList(props){

    return(
    <div className="found-profiles-container">
        {props.list.map((el, pos) => <FoundProfile edit={props.edit} remove={props.remove} data={el} ind={pos}/>)}
    </div>)
}
export default FoundProfileList;