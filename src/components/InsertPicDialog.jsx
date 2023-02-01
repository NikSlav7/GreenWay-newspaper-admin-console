import '../css/InsertPicDialog.css'
function InsertPicDialog(props){

    function getPicLink(){
        return document.getElementById('insert-pic-dialog-link').value;
    }

    function getPicWidth(){
        return document.getElementById('insert-pic-dialog-details').value;
    }

    return (
        <div className="insert-pic-dialog-container" >
            <div className='insert-pic-dialog-data-container'>
                <button className='insert-pic-dialog-close-button' onClick={() => props.close(false)}>+</button>
                <div className='insert-pic-dialog-header-container'>
                    <p className='insert-pic-dialog-header'>Insert a pic</p>
                </div>
                <div className='insert-pic-dialog-link-container'>
                    <input placeholder={'link'} className='insert-pic-dialog-link' id={'insert-pic-dialog-link'}></input>
                </div>
                <div className='insert-pic-dialog-details-container'>
                    <select id='insert-pic-dialog-details' className='insert-pic-dialog-details'>
                        <option value={"full"}>Full Width</option>
                        <option value={"small-left"}>Small Left</option>
                        <option value={"small-center"}>Small Center</option>
                        <option value={"small-right"}>Small Right</option>
                    </select>
                </div>
                <div className='insert-pic-dialog-button-container'>
                    <button className='insert-pic-dialog-button' onClick={()=>props.insert(getPicLink(), getPicWidth())}>Insert</button>
                </div>
            </div>
        </div>
    )
}
export default InsertPicDialog;