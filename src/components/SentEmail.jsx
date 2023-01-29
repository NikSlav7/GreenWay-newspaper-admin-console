import '../css/AllEmailsPage.css'
import { useRef } from 'react';
function SentEmail(props){

    function onContainerClick(){
        window.location.pathname = '/edit/' + props.data['whenToSend'] + '/' + props.data['messageStatus'];
    }

    let statuses = useRef(['status-container-not-sent', 'status-container-sending', 'status-container-sent'])

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
        <div className={statuses.current[props.data['messageStatus']]}>

         </div>
    </div>
    
    )
}

export default SentEmail;