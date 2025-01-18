import React, { useState } from 'react';
import Loginform from './Loginform';
import SignUpForm from './SignUpForm';

const LoginContainer = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };
  
  return (
    <div className="login-page">
      <div className="welcome-section">
        <h1>Welcome!</h1>
        <p>StudyMate is your all-in-one platform to create and organize study materials, set and achieve study goals, and track your progress with ease.</p>
        <button className="learn-more-btn">Learn More</button>
      </div>
      
      {showLogin ? (
        <div className="login-form-container">
          <Loginform />
          <div className="login">
            <p>Don't have an account? <a onClick={handleToggle} style={{cursor: 'pointer'}}>Sign Up</a></p>
          </div>
        </div>
      ) : (
        <div className="signup-form-container">
          <SignUpForm />
          <div className="signup">
            <p>Already have an account? <a onClick={handleToggle} style={{cursor: 'pointer'}}>Log in</a></p>
          </div>
        </div>
      )}
    </div>
  );
};
export default LoginContainer;
