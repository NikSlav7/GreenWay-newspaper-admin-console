import '../css/AllEmailsPage.css'
function SentEmail(props){

    function onContainerClick(){
        window.location.pathname = '/edit/' + props.data['whenToSend'] + '/' + props.data['messageStatus'];
    }

    console.log(props.statuses[props.data['messageStatus']])
    return (
    
    <div className="sent-email-container" onClick={() => onContainerClick()}>
        <div className='sent-email-header-container'>
            <p className='sent-email-header'>{props.data['messageHeader']}</p>
        </div>
        <div className='sent-email-details-container'>
            <div className='sent-email-details-status-container'>
                <p className='sent-email-details-status'>{props.statuses[props.data['messageStatus']]}</p>
            </div>
            <div className='sent-email-details-date-container'>
                <p className='sent-email-details-date'>{props.data['whenToSend']}</p>
            </div>
           
        </div>
        <div className={props.data['messageStatus'] === 0 ? 'status-container-not-sent' : 'status-container-sent'}>

         </div>
    </div>
    
    )
}

export default SentEmail;