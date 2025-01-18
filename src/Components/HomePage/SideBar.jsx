import React, { useEffect } from 'react'

const SideBar = () => {

  const focusSection = (sectionId) => {
    // Remove focus from any previously focused section
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('focused');
    });

    // Blur all sections except the targeted one
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('blurred');
    });

    // Focus the clicked section and remove its blur
    const section = document.getElementById(sectionId);
    section.classList.remove('blurred');
    section.classList.add('focused');

  }

  const handleClickOutside = (event) => {
    // Check if the clicked element is outside the focused section
    if (!document.querySelector('.focused')?.contains(event.target) && !document.querySelector('.sidebar1').contains(event.target)) {
      // Reset focus and remove blur
      document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('focused');
        section.classList.remove('blurred');
      });
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

  return (
    <div>
      <div className="sidebar1">
        <h2 className='sidebar-Heading'>Dashboard</h2>
        <hr />
        <ul className='sidebar-links'>
          <li className='sidebar-link' onClick={() => focusSection('recent-Docs')}>Recent documents</li>
          <li className='sidebar-link' onClick={() => focusSection('near-deadlines')}>Deadlines</li>
          <li className='sidebar-link' onClick={() => focusSection('incomplete-tasks')}>Todays Tasks</li>
          <li className='sidebar-link' onClick={() => focusSection('goals-with-high-priority')}>Goals </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
