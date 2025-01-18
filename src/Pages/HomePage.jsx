import React from 'react'
import SideBar from '../Components/HomePage/SideBar'
import MainContent from '../Components/HomePage/MainContent'
import '../assets/Styles/HomePage.css'

const HomePage = () => {
  return (
    <div className='container1'>
      <SideBar/>
      <MainContent/>    
    </div>
  )
}

export default HomePage
