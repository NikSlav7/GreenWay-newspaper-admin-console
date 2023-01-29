import '../css/FoundProfiles.css'
import FoundProfileEditDetails from './FoundProfileEditDetails';
import { useRef } from 'react';
function FoundProfile(props){

    const editing = useRef(false);


    function formatInterests(interests){
        let result = '';
        interests.forEach((interest, ind) =>{
            if (ind > 0) result += ',' 
            result += ' ' + interest; 
        }) 
        return result;
    }

    function getInterests(){

        let interests = props.data['interests'];

        if (interests.length === 3) return interests;

        for (var i = interests.length; i < 3; i++){
            interests.push(null);
        }
    }

    function updateFollower(oldFollower, newFollower){
        let body = {};
        body['oldFollower'] = oldFollower;
        body['newFollower'] = newFollower;
        console.log(body)
        fetch("http://localhost:12121/api/followers/update", {
            method:"post",
            headers:{
                'Authorization': getCookie('EMAILAUTHTOKEN'),
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
    }

    function saveProfile(id){
        let dataCopy = props.data;
        for (var i = 0; i < 3; i++){
            let select = document.getElementById(id + i);
            dataCopy['interests'][i] = select.value;
        }
        updateFollower(props.data, dataCopy)
    
    }

    function onSaveButtonClick(id){
        saveProfile(id)
        props.edit(props.data['followerEmail'], !editing.current)
        editing.current = !editing.current;
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
    <div className='found-profile-large-container'>
        <div className="found-profile-container">
            <div className='found-profile-details-container'>
                <div className="found-profile-email-container">
                    <p className='found-profile-email'>{props.data['followerEmail']}</p>
                </div>

                <div className="found-profile-interests-container">
                    <p className='found-profile-interests'><b>Interests: </b>{formatInterests(props.data['interests'])}</p>
                </div>
            </div>

            <div className='found-profile-buttons-container'>
                <button className='found-profile-remove-button' bckg-color="red" onClick={() => props.remove(props.data['followerEmail'], props.ind)}>Remove</button>
                <button className='found-profile-edit-button' onClick={() => {
                    props.edit(props.data['followerEmail'], !editing.current)
                    editing.current = !editing.current;
                }}>Edit</button>
            </div>
        </div>
        <FoundProfileEditDetails save={onSaveButtonClick} id={props.data['followerEmail']} interests={getInterests()}/>
    </div>)
}

export default FoundProfile;