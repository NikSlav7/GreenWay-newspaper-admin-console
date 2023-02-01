import '../css/PostPage.css'
import PostTopics from './PostTopics';
import SimplePicker from 'simplepicker';
import { useDebugValue, useEffect, useState } from 'react';
import { useRef } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
function PostData(props){

    function removeError(id){
        document.getElementById(id).classList.remove('error');
    }

    
   
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="postDataContainer">
            <div className='postDataTitleContainer' onClick={() => removeError('title-textarea')}>
                <input className='postDataTitle' type='text' placeholder='Title' id='title-textarea'/>
            </div>
            <div className='postDataSubTitleAndTimeContainer'>
                <div className='postDataSubTitleContainer'>
                    <input className='postDataSubTitle' placeholder='Subtitle' id='subtitle-textarea'  onClick={() => removeError('subtitle-textarea')}/>
                </div>
                <div className='postDataTimeContainer'>
                    <DateTimePicker
                        label="Pick Time"
                        value={props.whenToSend}
                        onChange={(newValue) => {
                        props.onDateChange(newValue.toDate());
                        }}
                        renderInput={(params) => <TextField  {...params} />}
                    />
                </div>
            </div>
            <PostTopics insertpic={props.insertpic}postTopics={props.postTopics}/>
        </div>
         </LocalizationProvider>

    )
}
export default PostData;
