import '../css/TestEmailDialog.css'

function TestEmailDialog(props){


    return (
        <div className="test-email-dialog-container">
            <div className='test-email-dialog-data-container'>
                <div className='test-email-dialog-data-header-container'>
                    <p  className='test-email-dialog-data-header'>Send test email</p>
                </div>
                <div className='test-email-dialog-data-emails-container'>
                    <textarea className='test-email-dialog-data-emails' id='test-email-dialog-data-emails'></textarea>
                </div>

                <div className='test-email-dialog-data-buttons-container'>
                    <button className='test-email-dialog-data-send-button' onClick={() => props.send()}>Send</button>
                    <button className='test-email-dialog-data-cancel-button' onClick={() => props.cancel()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default TestEmailDialog;