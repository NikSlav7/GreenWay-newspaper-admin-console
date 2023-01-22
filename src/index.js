import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
document.addEventListener('DOMContentLoaded', () =>{
  checkAuth()  
})

function checkAuth(){
  console.log(getCookie('EMAILAUTHTOKEN'))
  if (getCookie('EMAILAUTHTOKEN') === undefined) {
     if (window.location.pathname === '/login') return;
     window.location.pathname = '/login'
  }
  fetch('http://localhost:12121/api/check-token',{
    method: "get",
    headers: {
      'Authorization': getCookie('EMAILAUTHTOKEN')
    }
  }).then((resonse) =>{
    resonse.json().then((result) =>{
      console.log(result);
    })
  })

}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function getCookie(cookieName){
  let cookie = {};
  document.cookie.split(";").forEach(function(el){
   let[key, value] = el.split("=");
   cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}