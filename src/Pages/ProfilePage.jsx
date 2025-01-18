import React, { useState } from 'react'
import Content from '../Components/Profile/Content'
import ConfirmDialog from '../Components/Profile/ConfirmDialog'
import {useNavigate} from 'react-router-dom'
import '../assets/Styles/Profile.css'

const ProfilePage = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    setDialogVisible(false);
    sessionStorage.removeItem('userId');
    navigate('/')
    console.log('User logged out');
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };
  return (
    <div className="profile-container">
      <Content handleLogout={handleLogout} />
      <ConfirmDialog visible={isDialogVisible} onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  )
}

export default ProfilePage
