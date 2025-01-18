import React, { useState, useEffect } from 'react';
import { FaRectangleXmark } from "react-icons/fa6";
import axios from 'axios';

const MainEvents = ({ events, setEvents, handleVisibleForm }) => {

    const userId = sessionStorage.getItem('userId')

    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/Event/GetEvent', { params: { userId } })
                setEvents(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getEvent();
    }, [])

    const getBoxShadowStyle = (dueDate) => {
        const currentDate = new Date();
        const eventDate = new Date(dueDate);

        const TimeDiff = eventDate - currentDate;
        const dayDiff = Math.ceil(TimeDiff / (1000 * 60 * 60 * 24));

        if (dayDiff <= 2 && dayDiff > 0) {
            return '0px 0px 8px 1px  red'; //red
        } else if (dayDiff < 10 && dayDiff > 2) {
            return '0px 0px 8px 1px green'; //green
        }
        else if (dayDiff >= 10) {
            return '0px 0px 8px 1px yellow'; //yellow
        } else {
            return '0px 0px 8px 1px #fff';
        }
    };

    const deleteEvent = async (index) => {
        const eventToDelete = events[index].eventName;
        try {
            const response = await axios.delete(`https://backend-3282.onrender.com/Event/DeleteEvent`, {
                params: { eventToDelete: eventToDelete, userId: userId }
            })
            const events = response.data
            setEvents(events)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h2 className='event-heading'>Upcoming Events</h2>
            <div className="main-events">
                {events.map((event, index) => (
                    <div key={index} className="event-card" style={{ boxShadow: getBoxShadowStyle(event.deadline) }}>
                        <div className="event-card-header">
                            <div className="heading-container">
                                <h3 className="event-title">{event.eventName} </h3>
                            </div>
                            <FaRectangleXmark onClick={() => deleteEvent(index)} />
                        </div>
                        <p className="event-description">{event.eventDescription}</p>
                        <p className="event-due-date">Due Date: {event.deadline}</p>
                    </div>
                ))}
                <div className="addEvent">
                    <button className='Add-Event-Card' onClick={() => handleVisibleForm('event')}>+</button>
                </div>
            </div>
        </>
    );
};

export default MainEvents;