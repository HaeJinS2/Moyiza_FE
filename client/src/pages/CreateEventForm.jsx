import React, { useState } from 'react'
import { postAPI } from "../axios";
// import { useNavigate } from "react-router-dom";

function CreateEvent() {
    // const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [eventGroupsize, setEventGroupSize] = useState('');


    const handleCreateButton = () => {

        postAPI(`/club/1/event`, {
            eventTitle:title,eventContent:content,eventLocation:location,eventStartTime:startTime,eventGroupsize: Number(eventGroupsize),
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div>
            title <input value={title} onChange={(e)=>setTitle(e.target.value)} />
            content <input value={content} onChange={(e)=>setContent(e.target.value)} />
            location <input value={location} onChange={(e)=>setLocation(e.target.value)} />
            startTime <input value={startTime} onChange={(e)=>setStartTime(e.target.value)} />
            eventGroupsize <input value={eventGroupsize} onChange={(e)=>setEventGroupSize(e.target.value)} />

            <button onClick={handleCreateButton}>클럽생성하기버튼</button>
        </div>
    )
}

export default CreateEvent