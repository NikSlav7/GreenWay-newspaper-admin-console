import '../css/PostPage.css'
import PostData from './PostData';
import { useState, useEffect } from 'react';
import NavBar from './navbar';
import TestEmailDialog from './TestEmailDialog';
import InsertPicDialog from './InsertPicDialog';
import {PicInserter} from '../services/PicInserter.js'
import { useRef } from 'react';
import { picSizes } from '../services/PicSizes';
import TimePickerContainer from './TimePickerContainer';
import SimplePicker from 'simplepicker';
function PostPage(){

    const[topics, setTopics] = useState([])
    const[showTestEmailDialog, setShowTestEmailDialog] = useState(false)
    const[showInsertPicDialog, setShowInsertPicDialog] = useState(false);

    const currentInsertId = useRef('');

    const currentInsertPos = useRef('');

    const timePicker = useRef()


    const [whenToSend, setWhenToSend] = useState(new Date())

    function onDateChange(newDate){
        console.log(newDate);
        setWhenToSend(newDate)
    }
   
 

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

    function checkAllTopicsEntered(){
        let allow = true;
        let topicContainers = document.querySelectorAll('.postDataTopic');
        topicContainers.forEach(container =>{
            let el = container.getElementsByClassName('postDataTopicContent')[0];
            console.log(el)
            if (el.value.trim() === ''){
                allow = false;
                container.classList.add('error');
            }
        })
        let title = document.getElementById('title-textarea');
        let subtitle = document.getElementById('subtitle-textarea')

        if (title.value.trim() === '') {
            title.classList.add('error');
            allow = false;
        }
        if (subtitle.value.trim() === '') {
            subtitle.classList.add('error');
            allow = false;
        }

        return allow;
    }

    function parseDate(date){
        return (date.getDate() < 9 ? "0" +  (date.getDate()) : (date.getDate())) + '/' +(date.getMonth() < 9 ? "0" +  (date.getMonth() + 1) : (date.getMonth()+1)) + "/" + date.getFullYear() + " " + (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ":" +(date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
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
       if (!checkAllTopicsEntered()) {
        alert('Not all fields are filled')
        return;
       }
        if (!window.confirm("Are you sure that you want to send this email?")) return;
        let messageBody = getAllTextFields()
        let body = {};
        messageBody.forEach(element => {
            body[element['name']] = element['value']
        })
    
        fetch("http://localhost:12121/api/email/new-email", {
            method:"post",
            body: JSON.stringify({
                'body': body,
                'whenToPost': parseDate(whenToSend),
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


     function sendTestEmail(emails){
        let messageBody = {};
        messageBody['message'] = collectMessage();
        messageBody['emails'] = document.getElementById('test-email-dialog-data-emails').value.trim().split(/\s+/);
        console.log(messageBody);
        fetch('http://localhost:12121/api/email/send-test-email',{
            method: 'post',
            headers:{
                'Authorization': getCookie('EMAILAUTHTOKEN'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageBody)
        })
     }

     function collectMessage(){
        let body = {};
        body['header']= document.getElementById('title-textarea').value;
        body['subheader']= document.getElementById('subtitle-textarea').value;

        let temp = getAllTextFields()
        let messageBody = {};
        temp.forEach(element => {
            messageBody[element['name']] = element['value']
        })
        body['interests'] = messageBody;

        return body;
         
     }
     function onInsertButtonClick(src, width){
        let textField = document.getElementById(currentInsertId.current);
        let currentText = textField.value;

        textField.value = currentText.substring(0, currentInsertPos.current) + getInsertedPic(src, width) + currentText.substring(currentInsertPos.current);
        editInsertPicDialog(false, '');

     }

     function getInsertedPic(src, width){
        return ("\n\n <br />\n   <img src='" + src + "' " + "style='aspect-ratio: 4/3;  object-fit: contain; width : " + picSizes[width]['width'] + ";" + ' float: ' + picSizes[width]['float'] + ';' + "'/> \n <br />\n\n")
    }



     function onTestEmailDialogCancelButtonClick(){
        setShowTestEmailDialog(false)
     }
     function onTestEmailDialogSendButtonClick(){
        sendTestEmail()
        setShowTestEmailDialog(false)
     }
     function onShowTestEmailDialogButtonClick(){
        setShowTestEmailDialog(true)
     }

     function editInsertPicDialog(open, id){
        if (open){
        currentInsertId.current = id + '-textarea';
        currentInsertPos.current = document.getElementById(currentInsertId.current).selectionStart;
        }
        setShowInsertPicDialog(open)
     }

     function openPicker(){
     }
    
    return (
        <div className="postPageContainer">
            <NavBar></NavBar>
            {showInsertPicDialog && <InsertPicDialog insert={onInsertButtonClick} close={editInsertPicDialog}/>}
            <PostData whenToSend={whenToSend} onDateChange={onDateChange} postTopics={topics} timepick={openPicker} insertpic={editInsertPicDialog}/>
            {showTestEmailDialog && <TestEmailDialog send={onTestEmailDialogSendButtonClick} cancel={onTestEmailDialogCancelButtonClick}/>}
            <button className='emailSendButton' onClick={()=> onEmailSendButtonClick()}>Send email</button>
            <button className='emailTestSendButton' onClick={()=> onShowTestEmailDialogButtonClick()}>Send Test emails</button>
        </div>
    )
}
export default PostPage;