import '../css/PostPage.css'
import PostData from './PostData';
import { useState, useEffect } from 'react';
import NavBar from './navbar';
function PostPage(){

    const[topics, setTopics] = useState([])

    function getAllTopics(){
        fetch("http://localhost:12121/api/interest/get-all", {
            method:'get',
            headers:{
                'Authorization': getCookie('EMAILAUTHTOKEN')
            }
        }).then((response) =>{
            response.json().then((result) =>{
                console.log(result)
                setTopics(result)
            })
        })
    }
    function getCookie(cookieName){
        let cookie = {};
        document.cookie.split(";").forEach(function(el){
         let[key, value] = el.split("=");
         cookie[key.trim()] = value.trim();
        })
        return cookie[cookieName];
     }

     function onEmailSendButtonClick(){
        if (!window.confirm("Are you sure that you want to send this email?")) return;
        getAllTextFields()
        let messageBody = getAllTextFields()
        let body = {};
        messageBody.forEach(element => {
            body[element['name']] = element['value']
        })
    
        fetch("http://localhost:12121/api/email/new-email", {
            method:"post",
            body: JSON.stringify({
                'body': body,
                'whenToPost': document.getElementById('time-textarea').value,
                'header': document.getElementById('title-textarea').value,
                'subHeader': document.getElementById('subtitle-textarea').value
            }),
            headers:{
                'Authorization': getCookie('EMAILAUTHTOKEN'),
                'Content-Type': 'application/json'
            }
        }).then((response) =>{

            if (response.status === 200) {
                window.location.reload();
            }
            else {
                alert('Something went wrong. Please, check the details and try again')
            }
        })
     }

     function getAllTextFields(){
        let textFieldValues = topics.map(topic => ({'name': topic, 'value': document.getElementById(topic+'-textarea').value}))
        return textFieldValues;
     }
     useEffect(()=>{
        getAllTopics()
     },[])

    return (
        <div className="postPageContainer">
            <NavBar></NavBar>
            <PostData postTopics={topics}/>
            <button className='emailSendButton' onClick={()=> onEmailSendButtonClick()}>Send email</button>
        </div>
    )
}
export default PostPage;