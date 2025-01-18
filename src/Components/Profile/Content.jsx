import React, { useState , useEffect } from 'react'
import { FaUser } from "react-icons/fa6";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../../assets/Images/profile-picture.png'

const Content = ({ handleLogout }) => {

    const userId = sessionStorage.getItem('userId')

    const [profileInfo, setProfileInfo] = useState({
        firstName: '',
        lastName: '',
        contactNo: '',
        email: '',
        StudyField: '',
        StudentBio: ''
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('https://backend-3282.onrender.com/userProfile/getProfile', { params: { userId } })
                if(!response.data){
                    return
                }
                setProfileInfo(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProfile();
    },[userId])

    const nameRegex = /^[A-Za-z\s'-]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contactNoRegex = /^\d{10}$/;
    const studyFieldRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
    const bioRegex = /^[\s\S]{2,}$/;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfileInfo({
            ...profileInfo,
            [name]: value
        });
    };

    const handleSave = async () => {
        if (!nameRegex.test(profileInfo.firstName)) {
            toast.error('First name field only allows character data.');
            return;
        }
        if (!nameRegex.test(profileInfo.lastName)) {
            toast.error('Last name field only allows character data.');
            return;
        }
        if (!emailRegex.test(profileInfo.email)) {
            toast.error('Email is not valid.');
            return;
        }
        if (!contactNoRegex.test(profileInfo.contactNo)) {
            toast.error('Contact number is not valid.');
            return;
        }
        if (!bioRegex.test(profileInfo.StudentBio)) {
            toast.error('Bio is not in valid format.');
            return;
        }
        if (!studyFieldRegex.test(profileInfo.StudyField)) {
            toast.error('study field in not in valid format.');
            return;
        }

        await axios
            .post(
                'https://backend-3282.onrender.com/userProfile/profile',
                profileInfo , { params: { userId } }
            )
            .then(
                (response) => {
                    if (response.data) {
                        toast.success('Profile updated successfully.');
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
    };

    const handleCancel = () => {
        setProfileInfo({
            firstName: '',
            lastName: '',
            contactNo: '',
            email: '',
            StudyField: '',
            StudentBio: ''
        })
    };

    const editProfilePic = () => {
        // Add your edit profile logic here
    };

    return (
        <>
            <div className="profile-header">
                <div className="profile-logo">
                    <FaUser />
                    {/* <button className="linkedin-btn">Connect to LinkedIn</button> */}
                    {/* <button className="edit-btn" onClick={editProfilePic}> Edit</button> */}
                </div>
                <div className='log-out-container'><button className="log-out-btn" onClick={handleLogout}>Log out</button></div>
            </div>
            <div className="profile-content">
                <span className="heading">My Profile</span>
                <div className="section section1">
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" name="firstName" value={profileInfo.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" name="lastName" value={profileInfo.lastName} onChange={handleChange} />
                    </div>
                </div>

                <div className="section section2">
                    <div className="form-group">
                        <label htmlFor="Contact-no">Contact No</label>
                        <input type="text" name="contactNo" value={profileInfo.contactNo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Edu-field"> Education field</label>
                        <input type="text" name="StudyField" value={profileInfo.StudyField} onChange={handleChange} />
                    </div>
                </div>

                <div className="section section3">
                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <input type="text" name="email" value={profileInfo.email} onChange={handleChange} />
                    </div>
                </div>

                <div className="section4">
                    <div className="form-group">
                        <label htmlFor="StudentBio">Bio</label>
                        <textarea name="StudentBio" rows='6' placeholder="Enter your skills, achievements...." value={profileInfo.StudentBio} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="section5 footer">
                    <div className="profile-footer">
                        <button className="cancel-btn" onClick={handleCancel}>✗</button>
                        <button className="save-btn" onClick={handleSave}>✓</button>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} closeOnClick pauseOnHover />
        </>
    )
}
export default Content