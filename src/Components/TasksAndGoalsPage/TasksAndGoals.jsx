import React, {useEffect } from 'react';
import { FaRectangleXmark } from "react-icons/fa6";
import axios from 'axios';

const TasksAndGoals = ({ routines, setRoutines, tasks, setTasks, goals, setGoals, visibleTable, handleVisibleForm }) => {

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const getGoal = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/Goals/GetGoal', { params: { userId } })
                setGoals(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getGoal();
    }, [])

    useEffect(() => {
        const getTask = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/Tasks/GetTask', { params: { userId } })
                setTasks(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getTask();
    }
        , [])

    useEffect(() => {
        const getRoutine = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/Routine/GetRoutine', { params: { userId } })
                setRoutines(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getRoutine();
    }
        , [])

    const getBG = (priority) => {
        if (priority === 'High') {
            return 'red'
        } else if (priority === 'Low') {
            return 'green'
        } else if (priority === 'Medium') {
            return 'yellow'
        } else {
            return null
        }
    }

    const deleteTask = async (index) => {
        const taskToDelete = tasks[index].TaskName;
        try {
            const response = await axios.delete('https://backend-3282.onrender.com/Tasks/RemoveTask', {
                params: { taskToDelete: taskToDelete, userId: userId }
            });
            const newTasks = (response.data)
            setTasks(newTasks)
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteGoal = async (index) => {
        const goalToDelete = goals[index].goalName;
        try {
            const response = await axios.delete('https://backend-3282.onrender.com/Goals/RemoveGoal', {
                params: { goalToDelete: goalToDelete, userId: userId }
            });
            const newGoals = response.data
            setGoals(newGoals)
        }catch (error) {
            console.log(error.message)
        }
    }

    const deleteRoutine = async (index) => {
        const routineToDelete = routines[index].routineName;
        try{
            const response = await axios.delete('https://backend-3282.onrender.com/Routine/RemoveRoutine', {
                params: { routineToDelete: routineToDelete, userId: userId }
            });
            const newRoutines = response.data
            setRoutines(newRoutines)
        }catch(error){
            console.log(error.message)
        }
    }

    return (
        <div className="tasks-and-goals">
            {visibleTable === 'tasks' && (
                <>
                    <h2 className="section-title">Tasks</h2>
                    <table className="tasks-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th className='buttons'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index} className='table-row'>
                                    <td>{task.TaskName}</td>
                                    <td>{task.StartTime} --- {task.EndTime}</td>
                                    <td>
                                        <select name="TStatus" id="TStatus">
                                            <option value={task.TaskStatus} selected>{task.TaskStatus}</option>
                                            <option value="OnGoing">On Going</option>
                                            <option value="Done">Done</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </td>
                                    <td onClick={() => deleteTask(index)}><FaRectangleXmark style={{ cursor: 'pointer' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='btnAdd' onClick={() => handleVisibleForm('task')}>+</button>
                </>
            )}

            {visibleTable === 'goals' && (
                <>
                    <h2 className="Section-title">Goals</h2>
                    <table className="goals-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Duedate</th>
                                <th>Priority</th>
                                <th className='buttons'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {goals.map((goal, index) => (
                                <tr key={index} className='table-row'>
                                    <td>
                                        <div className='goal-title'>
                                            <div className='goal-circle' style={{ backgroundColor: getBG(goal.goalPriority) }}></div>
                                            <div className="goal-title">{goal.goalName}</div>
                                        </div>
                                    </td>
                                    <td>{goal.goalDuedate}</td>
                                    <td>{goal.goalPriority}</td>
                                    <td onClick={() => deleteGoal(index)}><FaRectangleXmark style={{ cursor: 'pointer' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='btnAdd' onClick={() => handleVisibleForm('goals')}>+</button>
                </>
            )}

            {visibleTable === 'dailyRoutine' && (
                <>
                    <h2 className="section-title">Daily Routine</h2>
                    <table className="routine-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Duration</th>
                                <th className='StatusColumn'>Status</th>
                                <th className='buttons'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {routines.map((routine, index) => (
                                <tr key={index} className='table-row'>
                                    <td>{routine.routineName}</td>
                                    <td>{routine.StartTime} --- {routine.EndTime}</td>
                                    <td className='StatusColumn'>
                                        <select name="routineStatus" id="routineStatus">
                                            <option className='statusOption' value="InProgress">In Progress</option>
                                            <option className='statusOption' value="Completed">Completed</option>
                                            <option className='statusOption' value="Pending">Pending</option>
                                        </select>
                                    </td>
                                    <td onClick={() => deleteRoutine(index)}><FaRectangleXmark style={{ cursor: 'pointer' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='btnAdd' onClick={() => handleVisibleForm('routine')}>+</button>
                </>
            )}
        </div>
    );
};

export default TasksAndGoals;