import '../css/FoundProfiles.css'
function InterestEdit(props){

    console.log(props.selected)

    return (
        <div className='edit-details-select-container'>
            <select className="edit-details-select" selected={props.selected}>
                <option value={null}>None</option>
                {props.options.map(option => <option  value={option}>{option}</option>)}
            </select>
        </div>
    )
}
export default InterestEdit;