import React, { useState } from 'react'
import SideBar from '../Components/TasksAndGoalsPage/SideBar'
import MainEvents from '../Components/TasksAndGoalsPage/MainEvents'
import TasksAndGoals from '../Components/TasksAndGoalsPage/TasksAndGoals'
import Forms from '../Components/TasksAndGoalsPage/Forms.jsx'
import "../assets/Styles/TasksAndGoalsPage.css"

function TasksAndGoalsPage() {
    const [visibleTable, setVisibleTable] = useState('dailyRoutine');
    const [visibleForm, setVisibleForm] = useState(null);
    const [routines, setRoutines] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState([]);
    const [events , setEvents] = useState([]);

    const handleSidebarClick = (table) => {
        setVisibleTable(table);
    };

    const handleVisibleForm = (FormType) => {
        setVisibleForm(FormType);
    }

    const handleHideForm = () => {
        setVisibleForm(null);
    };

    return (
        <div className='Section1'>
            <SideBar handleSidebarClick={handleSidebarClick} />
            <div className='Section2'>
                <MainEvents events={events} setEvents={setEvents} handleVisibleForm={handleVisibleForm} />
                <TasksAndGoals routines={routines} setRoutines={setRoutines} tasks={tasks} setTasks={setTasks} goals={goals} setGoals={setGoals} visibleTable={visibleTable} handleVisibleForm={handleVisibleForm} />
            </div>

            {visibleForm && (
                <div className="form-overlay" onClick={handleHideForm}>
                    <div className="form-wrapper" onClick={(e) => e.stopPropagation()}>
                        <Forms setRoutines={setRoutines} setTasks={setTasks} setGoals={setGoals} setEvents={setEvents} VisibleForm={visibleForm} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default TasksAndGoalsPage
