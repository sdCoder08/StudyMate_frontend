import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import {fas, faFileAlt} from 'react-icons';
import { FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {

    const userId = sessionStorage.getItem('userId')

    const [recentDocuments, setRecentDocuments] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [goals, setGoals] = useState([]);
    const [incompleteTasks, setIncompleteTasks] = useState([]);

    const dateDifferenceInDays = (date) => {
        const today = new Date();
        const givenDate = new Date(date);
        return Math.floor((today - givenDate) / (1000 * 60 * 60 * 24));
    };

    // useEffect(() => {
    //     const fetchDocuments = async () => {
    //         try {
    //             const response = await axios.get('https://backend-3282.onrender.com/Documents/getDocuments', {
    //                 params: { userId: userId }
    //             });
    //             console.log(response.data); // Check if data is as expected
    //             setRecentDocuments(response.data); // Use response.data if data is in that structure
    //         } catch (error) {
    //             console.error('Error fetching documents:', error.response ? error.response.data : error.message);
    //         }
    //     };

    //     fetchDocuments();
    // }, [userId]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/Documents/getDocuments', {
                    params: { userId: userId },
                });
                const filteredDocs = response.data.filter((doc) => dateDifferenceInDays(doc.createdDate) <= 4); // Only include documents created in the last 4 days
                setRecentDocuments(filteredDocs);
            } catch (error) {
                console.error('Error fetching documents:', error.response ? error.response.data : error.message);
            }
        };

        fetchDocuments();
    }, [userId]);

    useEffect(() => {
        const fetchDeadlines = async () => {
          try {
            const response = await axios.get('https://backend-3282.onrender.com/Event/GetEvent', {
              params: { userId: userId },
            });
            const filteredEvents = response.data.filter((event) => {
              const dueDate = new Date(event.deadline);
              const currentDate = new Date();
              const dayDifference = (dueDate - currentDate) / (1000 * 60 * 60 * 24);
              return dayDifference >= 0 && dayDifference < 4; // Display events due within the next 4 days
            });
            setDeadlines(filteredEvents);
          } catch (error) {
            console.error('Error fetching deadlines:', error.response ? error.response.data : error.message);
          }
        };
    
        fetchDeadlines();
      }, [userId]);

      useEffect(() => {
        const fetchGoals = async () => {
          try {
            const response = await axios.get('https://backend-3282.onrender.com/Goals/getGoal', {
              params: { userId: userId },
            });
            const highPriorityGoals = response.data.filter((goal) => goal.goalPriority.toLowerCase() === 'high'); // Display only high-priority goals
            setGoals(highPriorityGoals);
          } catch (error) {
            console.error('Error fetching goals:', error.response ? error.response.data : error.message);
          }
        };
    
        fetchGoals();
      }, [userId]);

      useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await axios.get('https://backend-3282.onrender.com/Tasks/getTask', {
              params: { userId: userId },
            });
            const pendingTasks = response.data.filter((task) => task.TaskStatus.toLowerCase() === 'pending'); // Display only tasks with pending status
            setIncompleteTasks(pendingTasks);
          } catch (error) {
            console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
          }
        };
    
        fetchTasks();
      }, [userId]);

    const navigate = useNavigate();

    const handleDoubleClick = (e) => {
        navigate('/tasks')
    }

    const handletaskDoubleClick = () => {
        navigate('/documents')
    }
    return (
        <div>
            <div className="main-content" id="main-content">
                <div className="section" id="recent-Docs" >
                    <h3 className='section-heading' onDoubleClick={() => handletaskDoubleClick('documents')}>Recently created documents</h3>
                    <div className='section-body'>
                        {
                            recentDocuments.map((doc, index) => (
                                <div className="document-card" key={index}>
                                    <i className="fa-file-alt"><FaFileAlt /></i>
                                    <div className="document-info">
                                        <div className='document-name'>{doc.Title}</div>
                                        <p>Last Edited: {doc.createdDate}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="section" id="near-deadlines">
                    <h3 className='section-heading' onDoubleClick={() => handleDoubleClick('deadlines')}>Deadlines</h3>
                    <div className='section-body'>
                        {
                            deadlines.map((task, index) => (
                                <div className="progress-bar" key={index}>
                                    <div className="progress">{task.eventName}</div>
                                    <p>Due: {task.deadline}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="section" id="incomplete-tasks">
                    <h3 className='section-heading' onDoubleClick={() => handleDoubleClick('tasks')}>Today's incomplete tasks</h3>
                    <div className="section-body">
                        {
                            incompleteTasks.map((task, index) => (
                                <ul key={index} className='tasks-section'>
                                    <li className='task'>
                                        <span className='task-title'>{task.TaskName}</span>
                                        <span className="time">Completion time: {task.EndTime}</span>
                                    </li>
                                </ul>
                            ))
                        }
                    </div>
                </div>

                <div className="section" id="goals-with-high-priority">
                    <h3 className='section-heading' onDoubleClick={() => handleDoubleClick('goals')}>Goals with high priority</h3>
                    <div className="section-body">
                        {
                            goals.map((goal, index) => (
                                <ul key={index} className='goal-section'>
                                    <li className='goal'>
                                        <div>
                                            <span className='goal-name'>{goal.goalName}</span>
                                            <span className="target-date">Target: {goal.goalDuedate}</span>
                                        </div>
                                        <span className="badge">{goal.goalPriority}</span>
                                    </li>
                                </ul>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainContent
