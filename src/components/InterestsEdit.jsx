import '../css/FoundProfiles.css'
import InterestEdit from './InterestEdit';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
function InterestsEdit(props){

    const [interstOptions, setInterestOptions] = useState([]);

    console.log(props.userInterests)

    function getCookie(cookieName){
        let cookie = {};
        document.cookie.split(";").forEach(function(el){
         let[key, value] = el.split("=");
         cookie[key.trim()] = value.trim();
        })
        return cookie[cookieName];
     }

    function getAllInterests(){
        fetch("http://localhost:12121/api/interest/get-all", {
            method:'get',
            headers:{
                'Authorization': getCookie('EMAILAUTHTOKEN')
            }
        }).then((response) =>{
            response.json().then((result) =>{
                setInterestOptions(result)
            })
        })
    }
    useEffect(()=>{
        getAllInterests()
    },[])

    return(
        <div className='edit-details-container-'>
            <div className="edit-interests-container">
                {props.userInterests.map((interest, ind) => <InterestEdit ind={ind} id ={props.id} selected={interest} options={interstOptions}/>)}
            </div> 
        </div>
    )

}
export default InterestsEdit;