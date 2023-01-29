import NavBar from "./navbar";
import EmailList from "./EmailList";
import '../css/AllEmailsPage.css'
import SendingEmailList from "./SendingEmailList";
function AllEmailsPage(){

    return (
        <div className="emails-page-container">
            <NavBar/>
            <div className="content-container">
                <div className="emails-container">
                    <EmailList future={true}/>
                    <EmailList future={false}/>
                </div>
                <SendingEmailList />
            </div>
        </div>
    )
}

export default AllEmailsPage;