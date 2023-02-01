import { useParams } from 'react-router-dom';
import { useState } from 'react';
import '../css/PostPage.css'
import PostTopics from './PostTopics';
import '../css/EditPost.css'
import PostTopicsEdit from './PostTopicsEdit';
import { useEffect } from 'react';
import { useRef } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useCalendarState } from '@mui/x-date-pickers/internals';
function PostEditData(props){

    const{time, status} = useParams();

    const[data, setData] = useState({})

    const[flag, setFlag] = useState(false)

    const statuses = useRef([]);

    const[whenToSend, setWhenToSend] = useState(new Date());

    useEffect(()=>{
        getPostData();
        getAllStatuses();
    }, [])

    function onWhenToSendChange(newDate){
        setWhenToSend(newDate)
    }


    function getAllStatuses(){

        fetch('http://localhost:12121/api/email/get-status', {
            method: 'get',
            headers:{
                Authorization: getCookie("EMAILAUTHTOKEN")
            }
        }).then((response) =>{
            response.json().then((result) =>{
                statuses.current = result;
            })
        })
    }

    function getSentStatus(){
        console.log((statuses.current.length - 1))
        return (statuses.current.length - 1);
    }

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
                console.log(result['messageHeader'])
                if (result['messageHeader'] === undefined){
                    window.location.pathname = '/emails';
                }
                setData(result)
                setFlag(!flag)
                setUpValues(result)
                
            })
        })
    }

    function setUpValues(result){
        console.log(result['messageHeader'])
        document.getElementById('title-textarea').value = result['messageHeader'];
        document.getElementById('subtitle-textarea').value = result['messageSubHeader']
        let date = new Date(result['whenToSend']);
        console.log(date)
        setWhenToSend(date)

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
            window.location.reload()
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
        console.log(toJavaLocalDateTime(whenToSend))
        obj['whenToSend'] = toJavaLocalDateTime(whenToSend);



        let body = {};
        Object.keys(data['body']).forEach(key =>{
            body[key] = document.getElementById(key+"-textarea").value; 
        })

        obj['body']=body;

        return obj;
    }
    function toJavaLocalDateTime(date){
     return date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" +  (date.getMonth() + 1) : (date.getMonth()+1)) + "-" +  (date.getDate() < 9 ? "0" +  (date.getDate()) : (date.getDate())) + "T" + (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ":" +(date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
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
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="postDataContainer">
            <div className='postDataTitleContainer'>
                <input className='postDataTitle' type='text' placeholder='Title'  id='title-textarea'/>
            </div>
            <div className='postDataSubTitleAndTimeContainer'>
                <div className='postDataSubTitleContainer'>
                    <input className='postDataSubTitle' placeholder='Subtitle' id='subtitle-textarea'/>
                </div>
                <div className='postDataTimeContainer'>
                <DateTimePicker
                        label="Pick Time"
                        value={whenToSend}
                        onChange={(newValue) => {
                        onWhenToSendChange(newValue.toDate());
                        }}
                        renderInput={(params) => <TextField  {...params} />}
                    />
                </div>
            </div>
            {data['body'] != undefined && <PostTopicsEdit postTopics={data['body']}/>}
            {data['messageStatus'] !== getSentStatus() &&<div className='post-edit-buttons-container'>
                <div className='post-edit-button-container'>
                    <button className='post-edit-remove-button' onClick={() => removeMessage()}>Remove Post</button>
                </div>
                <div className='post-edit-button-container'>
                   <button className='post-edit-send-now-button' onClick={() => sendMessageNow()}>Send Now</button>
                </div>  
                
                <div className='post-edit-button-container'>
                    <button className='post-edit-save-button' onClick={() => saveMessage()}>Save Changes</button>  
                </div>
            </div>}
        </div>
        </LocalizationProvider>
    )
}
export default PostEditData;