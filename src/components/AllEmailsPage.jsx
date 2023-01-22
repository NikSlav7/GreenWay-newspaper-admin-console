import NavBar from "./navbar";
import EmailList from "./EmailList";
import '../css/AllEmailsPage.css'
function AllEmailsPage(){

    return (
        <div className="emails-page-container">
            <NavBar/>
            <div className="content-container">
                <div className="emails-container">
                    <EmailList future={true}/>
                    <EmailList future={false}/>
                </div>
            </div>
        </div>
    )
}

export default AllEmailsPage;