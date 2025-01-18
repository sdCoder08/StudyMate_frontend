import React from 'react'
import officeLook from '../../assets/Images/officeLook.jpg'
import ChatBot from '../../assets/Images/ChatBot.jpg'
import Note from '../../assets/Images/NoteTacking.jpg'
import Material from '../../assets/Images/StudyMaterials.jpg'

const FeaturesSection = () => {
    return (
        <div>
            <section className="key-features" id='features'>
                <div className="container">
                    <h2>Key Features</h2>
                    <ul>
                        <li>
                            <img src={Note} alt="StudyMate Hero Image" />
                            <h3>Note-Taking Made Easy</h3>
                            <p>Create, organize, and review notes with ease</p>
                        </li>
                        <li>
                            <img src={Material} alt="StudyMate Hero Image" />
                            <h3>Study Materials at Your Fingertips</h3>
                            <p>Store and access all your study materials in one place</p>
                        </li>
                        <li>
                            <img src={officeLook} alt="StudyMate Hero Image" />
                            <h3>Track Your Progress</h3>
                            <p>Monitor your progress, identify areas for improvement, and stay motivated</p>
                        </li>
                        <li>
                            <img src={officeLook} alt="StudyMate Hero Image" />
                            <h3>Reminders and Notifications</h3>
                            <p>Stay on top of tasks and deadlines with customizable reminders</p>
                        </li>
                        <li>
                            <img src={ChatBot} alt="StudyMate Hero Image" />
                            <h3>Integrated Chatbot Support</h3>
                            <p>Get help and guidance from our AI-powered chatbot</p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default FeaturesSection
