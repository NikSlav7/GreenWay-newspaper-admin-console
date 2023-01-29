import { useParams } from 'react-router-dom';
import { useState } from 'react';
import '../css/PostPage.css'
import PostTopics from './PostTopics';
import '../css/EditPost.css'
import PostTopicsEdit from './PostTopicsEdit';
import { useEffect } from 'react';
function PostEditData(props){

    const{time, status} = useParams();

    const[data, setData] = useState({})

    const[flag, setFlag] = useState(false)

    useEffect(()=>{
        getPostData();
    }, [])

    function getPostData(){
        let url = new URL('http://localhost:12121/api/email/get-one-email');
        let params = {'time': time, 'status': status}
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        })
        fetch(url, {
            method: "get",
            headers:{
                Authorization: getCookie("EMAILAUTHTOKEN")
            }
        }).then((response) =>{
            response.json().then((result) =>{
                setData(result)
                setFlag(!flag)
                console.log(data)
                setUpValues(result)
            })
        })
    }

    function setUpValues(result){
        console.log(result['messageHeader'])
        document.getElementById('title-textarea').value = result['messageHeader'];
        document.getElementById('subtitle-textarea').value = result['messageSubHeader']
        document.getElementById('time-textarea').value = parseDate(new Date(result['whenToSend']))

        Object.keys(result['body']).forEach(key =>{
            document.getElementById(key + "-textarea").value = result['body'][key];
        })
    }

    function sendMessageNow(){
        fetch('http://localhost:12121/api/email/send-now', {
            method: 'post',
            headers: {
                'Authorization': getCookie("EMAILAUTHTOKEN"),
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(data)
        })
        redirectToEmailsPage()
    }

    function saveMessage(){
        fetch('http://localhost:12121/api/email/replace-email', {
            method: 'post',
            headers:{
                'Authorization': getCookie("EMAILAUTHTOKEN"),
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                'messageList':[data, getCurrentPostData()]
            })
        }).then(()=>{
            redirectToEmailsPage()
        })
    }

    function removeMessage(){
        fetch('http://localhost:12121/api/email/remove', {
            method: 'post',
            headers:{
                'Authorization': getCookie("EMAILAUTHTOKEN"),
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(data)
        }).then(()=>{
            redirectToEmailsPage()
        })
        
    }

    function redirectToEmailsPage(){
        window.location.pathname = "/emails"
    }

    function getCurrentPostData(){
        let obj = {}
        obj['messageHeader'] = document.getElementById('title-textarea').value;
        obj['messageSubHeader'] = document.getElementById('subtitle-textarea').value;
        obj['messageStatus'] = data['messageStatus']
        let date = new Date(document.getElementById('time-textarea').value);
        console.log(toJavaLocalDateTime(date))
        obj['whenToSend'] = toJavaLocalDateTime(date);



        let body = {};
        Object.keys(data['body']).forEach(key =>{
            body[key] = document.getElementById(key+"-textarea").value; 
        })

        obj['body']=body;

        return obj;
    }
    function toJavaLocalDateTime(date){
        return date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" +  (date.getMonth() + 1) : (date.getMonth()+1)) + "-" + date.getDate() + "T" + (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ":" +(date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    }

    function parseDate(date){
        console.log(date)
        return (date.getMonth() < 9 ? "0" +  (date.getMonth() + 1) : (date.getMonth()+1))+ "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
    }
    function getCookie(cookieName){
        let cookie = {};
        document.cookie.split(";").forEach(function(el){
         let[key, value] = el.split("=");
         cookie[key.trim()] = value.trim();
        })
        return cookie[cookieName];
     }

    return (
        <div className="postDataContainer">
            <div className='postDataTitleContainer'>
                <input className='postDataTitle' type='text' placeholder='Title'  id='title-textarea'/>
            </div>
            <div className='postDataSubTitleAndTimeContainer'>
                <div className='postDataSubTitleContainer'>
                    <input className='postDataSubTitle' placeholder='Subtitle' id='subtitle-textarea'/>
                </div>
                <div className='postDataTimeContainer'>
                    <input className='postDataTime' placeholder='Time' id='time-textarea'/>
                </div>
            </div>
            {data['body'] != undefined && <PostTopicsEdit postTopics={data['body']}/>}
            <div className='post-edit-buttons-container'>
                <div className='post-edit-button-container'>
                    <button className='post-edit-remove-button' onClick={() => removeMessage()}>Remove Post</button>  
                </div>
                {data['messageStatus'] !== 2 &&
                <div className='post-edit-button-container'>
                    <button className='post-edit-send-now-button' onClick={() => sendMessageNow()}>Send Now</button>  
                </div>  
                }
                <div className='post-edit-button-container'>
                    <button className='post-edit-save-button' onClick={() => saveMessage()}>Save Changes</button>  
                </div>                 
            </div>
        </div>
    )
}
export default PostEditData;