import { useEffect } from 'react';
import '../css/FoundProfiles.css'
function InterestEdit(props){

    console.log(props.selected)

    useEffect(()=>{
        setSelected();
    }, [])

    function setSelected(){
    }

    return (
        <div className='edit-details-select-container'>
            <select className="edit-details-select" id={props.id + '-edit-details-select' + props.ind}>
                {props.options.map(option => <option selected={option === props.selected ? 'selected' : null}  value={option}>{option}</option>)}
                <option value={null}>None</option>
            </select>
        </div>
    )
}
export default InterestEdit;