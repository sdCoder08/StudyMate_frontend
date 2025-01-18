import React, { Component } from 'react'
import officeLook from '../../assets/Images/officeLook.jpg'
import ChatBot from '../../assets/Images/StudyMaterials.jpg'

export class HeroSection extends Component {
    render() {
        return (
            <div>
                <section className="hero" id='hero'>
                    <div className="container">
                        <h1>Unlock Your Study Potential with StudyMate</h1>
                        <p>Stay organized, focused, and motivated to achieve your academic goals</p>
                        <button className="btn btn-primary">Get Started for Free</button>
                    </div>
                    <div className="image">
                        <img src={ChatBot} alt="StudyMate Hero Image" />
                    </div>
                </section>
            </div>
        )
    }
}

export default HeroSection
