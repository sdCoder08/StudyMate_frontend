import React from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Forms = ({ setRoutines, setTasks, setGoals, setEvents, VisibleForm }) => {

    const userId = sessionStorage.getItem('userId')

    function calculateTimeDifferenceInMinutes(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        const differenceInMilliseconds = end - start;

        return differenceInMilliseconds / (1000 * 60);
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const formType = data.formType;
        if (formType === 'event') {

            const eventInfo = {
                userId: userId,
                eventName: data.eventName,
                eventDescription: data.eventDescription,
                deadline: data.deadline
            }

            const inputDate = new Date(eventInfo.deadline)
            const currentDate = new Date()

            console.log(inputDate, currentDate)
            currentDate.setHours(0, 0, 0, 0)

            const timeDifference = inputDate.getTime() - currentDate.getTime();
            const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            if (dayDifference <= 2) {
                toast.error('Due date should be at least 2 days from current date.');
                return;
            }

            await axios
                .post(
                    'https://backend-3282.onrender.com/Event/SetEvents',
                    eventInfo
                )
                .then(
                    (response) => {
                        if (response.data) {
                            toast.success('Event created successfully..')
                            setEvents(response.data.Events)
                        }
                    })
                .catch(
                    (error) => {
                        if (error.response) {
                            toast.error(error.response.data.message);
                        }
                    })
        }
        if (formType === 'goals') {
            const goalInfo = {
                userId: userId,
                goalName: data.goalName,
                goalDuedate: data.goalDuedate,
                goalPriority: data.goalPriority
            }

            const inputDate = new Date(goalInfo.goalDuedate)
            const currentDate = new Date()
            currentDate.setHours(0, 0, 0, 0)

            const timeDifference = inputDate.getTime() - currentDate.getTime();
            const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            if (dayDifference <= 8) {
                toast.error('Due date should be at least 8 days from current date.');
                return;
            }

            await axios
                .post(
                    'https://backend-3282.onrender.com/Goals/SetGoal',
                    goalInfo
                )
                .then(
                    (response) => {
                        if (response.data) {
                            toast.success('Goal created successfully..')
                            setGoals(response.data.Goals)
                        }
                    })
                .catch(
                    (error) => {
                        if (error.response) {
                            toast.error(error.response.data.message);
                        }
                    })
        }
        if (formType === 'tasks') {
            const taskInfo = {
                userId: userId,
                TaskName: data.TaskName,
                StartTime: data.StartTime,
                EndTime: data.EndTime,
                TaskStatus: data.TaskStatus
            }

            const duration = Math.abs(calculateTimeDifferenceInMinutes(taskInfo.StartTime, taskInfo.EndTime))

            if (duration <= 30) {
                toast.error('Task duration should be at least 30 minutes.');
                return;
            }

            if (duration > 240) {
                toast.error('Task duration should be at most 4 hours.');
                return;
            }

            await axios
                .post(
                    'https://backend-3282.onrender.com/Tasks/SetTask',
                    taskInfo
                )
                .then(
                    (response) => {
                        if (response.data) {
                            toast.success('Task created successfully..')
                            setTasks(response.data.Tasks)
                        }
                    })
                .catch(
                    (error) => {
                        if (error.response) {
                            toast.error(error.response.data.message);
                        }
                    })
        }
        if (formType === 'routine') {
            const routineInfo = {
                userId: userId,
                routineName: data.routineName,
                StartTime: data.StartTime,
                EndTime: data.EndTime
            }


            const duration = calculateTimeDifferenceInMinutes(routineInfo.StartTime, routineInfo.EndTime)

            if (duration < 30) {
                toast.error('Routine duration should be at least 30 minutes.');
                return;
            }

            await axios
                .post(
                    'https://backend-3282.onrender.com/Routine/SetRoutine',
                    routineInfo
                )
                .then(
                    (response) => {
                        if (response.data) {
                            toast.success("Routine created successfully.")
                            setRoutines(response.data.Routines)
                        }
                    }
                )
                .catch(
                    (error) => {
                        if (error.response) {
                            toast.error(error.response.data.message);
                        }
                    }
                )
        }
    }
    return (
        <>
            {VisibleForm === 'event' && (
                <div className="form event-form">
                    <h2 className='form-heading'>Event Form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputs">
                            <input type="hidden" {...register("formType")} value="event" />
                            <input type="text" id="eventName" name="eventName" placeholder='Event Name' {...register("eventName", { required: true })} />
                            {errors.eventName && <span>This field is required</span>}
                            <textarea id="eventDescription" name="eventDescription" placeholder='Event Description' rows="4" {...register("eventDescription", { required: true })} />
                            {errors.eventDescription && <span>This field is required</span>}
                            <input type="date" id="deadline" name="deadline" placeholder='Set Due date for event'  {...register("deadline", { required: true })} />
                            {errors.deadline && <span>This field is required</span>}
                        </div>
                        <button type="submit" className="btn-add-item">Submit</button>
                    </form>
                </div>
            )}
            {VisibleForm === 'goals' && (
                <div className="form goal-form">
                    <h2 className='form-heading'>Goals Form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputs">
                            <input type="hidden" {...register("formType")} value="goals" />
                            <input type="text" id='goalName' name='goalName' placeholder='Enter Goal Name' {...register("goalName", { required: true })} />
                            {errors.goalName && <span>This field is required</span>}
                            <input type='date' id='goalDuedate' name='goalDuedate' placeholder='set due date for your goal' {...register("goalDuedate", { required: true })} />
                            {errors.goalDuedate && <span>This field is required</span>}
                            <select id='goalPriority' name='goalPriority' {...register("goalPriority", { required: true })}>
                                <option value=''>Set Priority</option>
                                <option value='High'>High</option>
                                <option value='Medium'>Medium</option>
                                <option value='Low'>Low</option>
                            </select>
                            {errors.goalPriority && <span>This field is required</span>}
                        </div>
                        <button type="submit" className="btn-add-item">Submit</button>
                    </form>
                </div>
            )}
            {VisibleForm === 'task' && (
                <div className="form tasks-form">
                    <h2 className='form-heading'>Tasks Form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputs">
                            <input type="hidden" {...register("formType")} value="tasks" />

                            <input type="text" id='taskName' placeholder='Enter Task Name' {...register("TaskName", { required: true })} />
                            {errors.TaskName && <span>This field is required</span>}

                            <div className="inputSet"><span>Start Time</span><input type='time' id='startTime' {...register("StartTime", { required: true })} /></div>
                            {errors.StartTime && <span>This field is required</span>}

                            <div className="inputSet"><span>End Time</span><input type='time' id='endTime' {...register("EndTime", { required: true })} /></div>
                            {errors.EndTime && <span>This field is required</span>}

                            <select id='taskstatus' {...register("TaskStatus", { required: true })}>
                                <option value=''>Select Status</option>
                                <option value='Done'>Done</option>
                                <option value='OnGoing'>On Going</option>
                                <option value='Pending'>Pending</option>
                            </select>
                            {errors.TaskStatus && <span>This field is required</span>}
                        </div>
                        <button type="submit" className="btn-add-item">Add</button>
                    </form>
                </div>
            )}
            {VisibleForm === 'routine' && (
                <div className="form routine-form">
                    <h2 className='form-heading'>Routine Form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputs">
                            <input type="hidden" {...register("formType")} value="routine" />

                            <input type="text" id='routineName' placeholder='Enter Routine Name' {...register("routineName", { required: true })} />
                            {errors.routineName && <span>This field is required</span>}

                            <div className="inputSet"><span>Start Time</span><input type="time" id='StartTime' {...register("StartTime", { required: true })} /></div>
                            {errors.StartTime && <span>This field is required</span>}

                            <div className="inputSet"><span>End Time</span><input type="time" id='EndTime'  {...register("EndTime", { required: true })} /></div>
                            {errors.EndTime && <span>This field is required</span>}
                        </div>
                        <button type="submit" className="btn-add-item">Add</button>
                    </form>
                </div>
            )}
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} closeOnClick pauseOnHover />
        </>
    )
}
export default Forms
