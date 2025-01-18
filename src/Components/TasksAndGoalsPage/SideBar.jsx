import React from 'react';

const SideBar = ({ handleSidebarClick }) => {
    return (
        <div className="sidebar">
                <h1 className="sidebar-title">Explore</h1>
                <hr></hr>
                <ul className="sidebar-list">
                    <li className="sidebar-item" onClick={() => handleSidebarClick('dailyRoutine')}>Daily Routine</li>
                    <li className="sidebar-item" onClick={() => handleSidebarClick('tasks')}>Current Day Tasks</li>
                    <li className="sidebar-item" onClick={() => handleSidebarClick('goals')}>Future Goals</li>
                </ul>
            
        </div>
    );
};

export default SideBar;