import { Checkbox } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import '../css/FollowersPage.css'
import FilterCheckbox from './FilterCheckbox';
import FoundProfileList from './FoundProfileList';
import NavBar from './navbar';
function FollowersPage(){

    const[foundProfiles, setFoundProfiles] = useState([]);

    const[flag, setFlag] = useState(false);

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
    useEffect(() => {
        getAllTopics()
    },[])

    function getCookie(cookieName){
        let cookie = {};
        document.cookie.split(";").forEach(function(el){
         let[key, value] = el.split("=");
         cookie[key.trim()] = value.trim();
        })
        return cookie[cookieName];
     }

    function findProfile(email){

        fetch("http://localhost:12121/api/followers/get-by-email-prefix-and-filter", {
            method: 'post', 
            headers:{
                'Authorization': getCookie('EMAILAUTHTOKEN'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'prefix': email,
                'interests': getInterestFilter()
            })
        }).then((response) =>{
            if (response.status !== 200) return;
            
            response.json().then((result) =>{
                let copy = result;
                setFoundProfiles(copy);
                console.log(copy)
            })
        }) 
    }

    function onProfileFindButtonClick(){
        let input = document.getElementById('email-input').value;
        console.log(input)
        if (input === '') {
            alert('email cannot be empty')
            return;
        }
        findProfile(input);
    }

    function onRemoveButtonClick(email, pos){
        if (!window.confirm("Are you sure you want to delete this follower")) return;
        removeFollower(email, pos)
    }
    function removeFollower(email, pos){

        fetch('http://localhost:12121/api/followers/remove', {
            method:'post',
            headers:{
                'Authorization': getCookie('EMAILAUTHTOKEN'),
                'Content-Type': 'application/json'
            },
            body: email
        }).then((response) =>{
            if (response.status !== 200) return;
            deleteProfileFromList(pos);
        })
    }

    function openFollowerEditWindow(email, open){
        let el = document.getElementById(email + '-edit-details-container');

        if (open){
            el.style.maxHeight = '100vh'
        }
        else {
            el.style.maxHeight = '0px';
        }
    }

    function deleteProfileFromList(ind){
        let copy = foundProfiles;
        copy.splice(ind, 1);
        console.log(copy)
        setFoundProfiles(copy)
        setFlag(!flag);
    }

    function getInterestFilter(){
        let checked = [];
        let checkboxes = document.querySelectorAll('.checkbox-input');
        checkboxes.forEach(checkbox =>{
            if (checkbox.checked){
                checked.push(checkbox.value)
            }
        })
        console.log(checked);
        return checked;
    }

    return (
        <div>
            <NavBar />
            <div className='followers-page-container'>
                <div className='followers-page-input-container'>
                    <div className='email-search-container'>
                        <div className='email-input-container'>
                            <input className='email-input' id='email-input'></input>
                        </div>
                        <div className='email-search-button-container'>
                            <button onClick={() => onProfileFindButtonClick()} className='email-search-button'>S</button>
                        </div>
                    </div>
                    <div className='filters-input-container'>
                        <div className='interest-filter-container'>
                            <div className='interest-filter-header-container'>
                                <p className='interest-filter-header'>Interests</p>
                            </div>
                            <div className='interest-filter-input-container'>
                                {topics.map(topic => <FilterCheckbox name={topic}/>)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='followers-page-output-container'>
                    <FoundProfileList edit={openFollowerEditWindow} remove={onRemoveButtonClick} list={foundProfiles}/>
                </div>
            </div>
        </div>
    )
}
export default FollowersPage;