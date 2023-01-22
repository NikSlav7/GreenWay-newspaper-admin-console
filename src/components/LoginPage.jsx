import { useEffect } from 'react';
import '../css/LoginPage.css'
function LoginPage(){


    function formOnSubmit(e){
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === '' || password === '') {
            alert('Credentials not entered properly')
            return;
        }
        loginRequest(username, password);
    }

   

    function loginRequest(username, password){
        fetch('http://localhost:12121/login', {
            method: "post",
            headers: {
                'username': username,
                'password': password
            }
        }).then((response) => {
            console.log(response.status)
            let cookieToSet = response.headers.get("Authorization");
            if (response.status != 200 || cookieToSet === null){
                alert('wrong credentials')
                return
            }           
           document.cookie = 'EMAILAUTHTOKEN=' + cookieToSet;
           window.location.pathname = '/home'

        })
    }


    return (
        <div className="login-page-container">
            <div className='login-page-details-container'>
                <div className='login-page-header-container'>
                    <p className='login-page-header'>Login</p>
                </div>
                <div className='login-page-credentials-container'>
                    <form onSubmit={(e) => formOnSubmit(e)} id='login'>
                        <input id='username' placeholder='username'/><br />
                        <input id='password' placeholder='password' type='password'/>
                        <button type='submit' className='login-button'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;