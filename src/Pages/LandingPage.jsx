import React from 'react'
import HeroSection from '../Components/Landing/HeroSection'
import FeaturesSection from '../Components/Landing/FeaturesSection'
import FooterSection from '../Components/Landing/FooterSection'
import IntroSection from '../Components/Landing/IntroSection'
import BenefitesSection from '../Components/Landing/BenefitesSection'
import WorkingSection from '../Components/Landing/WorkingSection'
import TestimonalsSection from '../Components/Landing/TestimonalsSection'
import '../assets/Styles/LandingPage.css'

const LandingPage = () => {
    return (
        <div>
            <HeroSection />
            <IntroSection />
            <FeaturesSection />
            <WorkingSection />
            <BenefitesSection />
            <TestimonalsSection />
            <FooterSection />
        </div>
    )
}

export default LandingPage
