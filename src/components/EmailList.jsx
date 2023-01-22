import { useEffect, useReducer, useRef, useState } from 'react';
import '../css/AllEmailsPage.css'
import SentEmail from './SentEmail';
function EmailList(props){

    const future = props.future;

    const date = useRef(new Date())
    const daysLoaded = useRef(0);
    const [flag, setFlag] = useState(false)
    

    const [posts, setPosts] = useState([]) 

    const possibleStatuses = useRef('');


    useEffect(()=>{
        console.log('use effect')
        getMessageStatuses();
        requestPosts(0)
    },[])

    function requestPosts(){
        let url = new URL('http://localhost:12121/api/email/get-emails');
        let params = {isSent: !future, date: parseDate(date.current), daysOffset: daysLoaded.current}
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

    function onLoadMoreButtonClick(){
        console.log('click')
        requestPosts();
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

    return (
    <div className='email-list-container'>  
        
        <div className="email-list">
            {[...posts].map(post => <SentEmail statuses={possibleStatuses.current} data={post}/>)}
        </div>

        <div className='email-list-button-container'>
            <button onClick={()=>{onLoadMoreButtonClick()}} className='email-list-button'>Load More</button>
        </div> 
    </div> )
}
export default EmailList;