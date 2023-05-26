import React, { useState } from 'react'
import { motion } from "framer-motion";
import { postAPI } from "../axios";
import DatePicker from 'react-datepicker';
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "../component/Navbar";
import { fadeIn } from '../variants'
// import { useNavigate } from "react-router-dom";
import { FiCalendar } from 'react-icons/fi';

function CreateEvent() {
    // const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [dateString, setDateString] = useState('');
    const [eventGroupsize, setEventGroupSize] = useState('');


    const handleCreateButton = () => {

        postAPI(`/club/39/event`, {
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

    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button className="flex items-center justify-center  shadow-md w-80 h-12 rounded-lg mb-4 border-1" onClick={onClick} ref={ref}>
            <FiCalendar className="mr-2" />
            {value}
        </button>
    ));

    return (
        <>
            <Navbar />
            <div className='flex flex-1 flex-col items-center justify-center  h-[100vh] '>
                <motion.div
                    variants={fadeIn('up', 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                    className='flex flex-1 flex-col items-center justify-center  gap-y-[15px]'>
                    <div className='flex flex-1 flex-col items-center justify-center  gap-y-[15px] '>
                        title <input className='shadow-md w-80 h-12 rounded-lg mb-4 border-1' value={title} onChange={(e) => setTitle(e.target.value)} />
                        content <input className='shadow-md w-80 h-12 rounded-lg mb-4 border-1' value={content} onChange={(e) => setContent(e.target.value)} />
                        location <input className='shadow-md w-80 h-12 rounded-lg mb-4 border-1' value={location} onChange={(e) => setLocation(e.target.value)} />
                        <GlobalStyle />
                        startDate
                        <div className='flex'>
                            <StyledDatePicker
                                className="shadow-md"
                                dateFormat="yyyy-MM-dd"
                                showIcon
                                selected={startDate}
                                onChange={handleDateChange}
                                customInput={<CustomInput />}
                            />
                        </div>
                        eventGroupsize <input className='shadow-md w-80 h-12 rounded-lg mb-4 border-1' value={eventGroupsize} onChange={(e) => setEventGroupSize(e.target.value)} />
                        <button onClick={handleCreateButton}>이벤트생성하기버튼</button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}



const StyledDatePicker = styled(DatePicker).attrs({
    calendarClassName: 'my-calendar'
})``;

const GlobalStyle = createGlobalStyle`
.my-calendar {
    background-color: #fff;
    
}
.react-datepicker {
    font-size: 1rem;
}
.react-datepicker__current-month {
    font-size: 1rem;
    color: #fff;
}
.react-datepicker__day {
    width: 2rem;
    line-height: 2rem;
    
}
.react-datepicker__day-name {
    width: 2rem;
    line-height: 2rem;
    color: #fff;
}
.react-datepicker__header {
    background-color: #FB7185;
    color: white;
}
.react-datepicker__day--selected {
    background-color: red;
}
`;


export default CreateEvent