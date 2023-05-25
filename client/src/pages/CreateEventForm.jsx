import React, { useState } from 'react'
import { postAPI } from "../axios";
import DatePicker from 'react-datepicker';
import styled, { createGlobalStyle } from "styled-components";


// import { useNavigate } from "react-router-dom";

function CreateEvent() {
    // const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); 
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [dateString, setDateString] = useState('');
    const [eventGroupsize, setEventGroupSize] = useState('');


    const handleCreateButton = () => {

        postAPI(`/club/1/event`, {
            eventTitle: title, eventContent: content, eventLocation: location, eventStartTime: dateString, eventGroupsize: Number(eventGroupsize),
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.error(error)
        })
    }  


  const handleDateChange = (date) => {
    setStartDate(date);

    const dateString = date.toISOString().split('T')[0];
    setDateString(dateString);
  };
    console.log(dateString)
    return (
        <div>
            <div className='flex flex-1 flex-col'>
                title <input value={title} onChange={(e) => setTitle(e.target.value)} />
                content <input value={content} onChange={(e) => setContent(e.target.value)} />
                location <input value={location} onChange={(e) => setLocation(e.target.value)} />
                <GlobalStyle />
                startDate <StyledDatePicker 
                dateFormat="yyyy-MM-dd"
                showIcon selected={startDate} onChange={handleDateChange} />
                eventGroupsize <input value={eventGroupsize} onChange={(e) => setEventGroupSize(e.target.value)} />
                <button onClick={handleCreateButton}>클럽생성하기버튼</button>
            </div>
        </div>
    )
}



const StyledDatePicker = styled(DatePicker).attrs({
    calendarClassName: 'my-calendar'
})``;

const GlobalStyle = createGlobalStyle`
.my-calendar {
    background-color: lightblue;
}
.react-datepicker {
    font-size: 1rem;
}
.react-datepicker__current-month {
    font-size: 1rem;
}
.react-datepicker__day {
    width: 2rem;
    line-height: 2rem;
}
.react-datepicker__day-names {
    width: 2rem;
    line-height: 2rem;
}
.react-datepicker__header {
    background-color: blue;
    color: white;
}
.react-datepicker__day--selected {
    background-color: red;
}
`;


export default CreateEvent