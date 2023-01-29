import '../css/SendingEmailList.css'
import SentEmail from './SentEmail';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
function SendingEmailList(){

    const date = useRef(new Date())
    const daysLoaded = useRef(0);
    const [flag, setFlag] = useState(false)
    const [posts, setPosts] = useState([]) 
    const possibleStatuses = useRef([])


    useEffect(()=>{
        requestPosts();
    },[])

    function requestPosts(){
        let url = new URL('http://localhost:12121/api/email/get-emails');
        let params = {isSent: true, isSending: true, date: parseDate(date.current), daysOffset: daysLoaded.current}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url, {
            method: 'get',
            headers:{
                'Authorization': getCookie('EMAILAUTHTOKEN')
            }
        }).then((response) => {
            if (response.status !== 200){
                alert('Something went wrong, try again')
                return;
            }
            response.json().then((result) => {
                let copy = posts;
                result.forEach(el => {
                    copy.push(el);
                })
                setPosts(posts => copy);
                setFlag(!flag)
                console.log(result)
                daysLoaded.current++;
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

     function parseDate(date){
        return (date.getUTCMonth() < 9 ? "0" +  (date.getUTCMonth() + 1) : (date.getUTCMonth()+1))+ "/" + date.getUTCDate() + "/" + date.getUTCFullYear() + " " + date.getUTCHours() + ":" + (date.getUTCMinutes() < 10 ? '0'+date.getUTCMinutes() : date.getUTCMinutes());
    }

    function getMessageStatuses(){

        fetch("http://localhost:12121/api/email/get-status", {
            method: 'get',
            headers: {
                'Authorization': getCookie('EMAILAUTHTOKEN')
            }
        }).then((response) =>{
            response.json().then((result) =>{
                possibleStatuses.current = result;
                console.log(possibleStatuses.current)
            })
        })
    }

    return (
        <div className='sending-email-list-container'>
            {[...posts].map(post => <SentEmail statuses={possibleStatuses.current} data={post}/>)}
        </div>
    )
}

export default SendingEmailList;