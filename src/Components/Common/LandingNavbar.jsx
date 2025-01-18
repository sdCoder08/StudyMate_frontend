import React from 'react'
import { Link as ScrollLink, animateScroll as scroll, scroller } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import './LandingNavbar.css'

const scrollToCenter = (element) => {
    const elementPosition = document.getElementById(element).offsetHeight;
    scroller.scrollTo(element, {
        delay: 2,
        behavior: "Smooth",
        top: elementPosition
    })
}
const LandingNavbar = () => {
    return (
        <nav className="Landing-navbar">
            <div className="logo-container">
                <span className="logo">StudyMate</span>
            </div>
            {/* <div className="links-container">
                <ul className="Landing-nav-links">
                    <li><ScrollLink to="hero" smooth={true} duration={500} onClick={() => scrollToCenter('hero')}>Welcome</ScrollLink></li>
                    <li><ScrollLink to="about" smooth={true} duration={500} onClick={() => scrollToCenter('about')}>About</ScrollLink></li>
                    <li><ScrollLink to="features" smooth={true} duration={500} onClick={() => scrollToCenter('features')}>Features</ScrollLink></li>
                    <li><ScrollLink to="working" smooth={true} duration={500} onClick={() => scrollToCenter('working')}>Working</ScrollLink></li>
                    <li><ScrollLink to="benifits" smooth={true} duration={500} onClick={() => scrollToCenter('benifits')}>Benifits</ScrollLink></li>
                    <li><ScrollLink to="testimonals" smooth={true} duration={500} onClick={() => scrollToCenter('testimonals')}>Testinomals</ScrollLink></li>
                </ul>
            </div> */}
            <div className="links-container">
                <button className="btn btn-primary"><RouterLink to="/user/auth" className='signupbtn'>Log In</RouterLink></button>
            </div>
        </nav>
    )
}

export default LandingNavbar