import { InputUnstyled } from '@mui/base';
import '../css/FilterCheckbox.css'
function FilterCheckbox(props){

    return(
     <div className="checkbox-container">
        <div className='checkbox-header-container'>
            <p className='checkbox-header'>{props.name}</p>
        </div>
        <div className='checkbox-input-container'>
            <input className='checkbox-input' value={props.name} type='checkbox' ></input>
        </div>
    </div>
    )
}
export default FilterCheckbox;