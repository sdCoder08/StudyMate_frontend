import React from 'react'

const BenefitesSection = () => {
  return (
    <div>
      <section className="benefits" id='benifits'>
        <div className="container">
          <h2>Why Choose StudyMate?</h2>
          <ul>
            <li>
              <i className="fas fa-rocket"></i>
              <h3>Boost Your Productivity</h3>
              <p>Stay organized and focused to achieve your academic goals</p>
            </li>
            <li>
              <i className="fas fa-lock"></i>
              <h3>Secure and Private</h3>
              <p>Your data is safe and secure with StudyMate</p>
            </li>
            <li>
              <i className="fas fa-smile"></i>
              <h3>Reduce Stress and Anxiety</h3>
              <p>Stay on top of tasks and deadlines with StudyMate's reminders and notifications</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default BenefitesSection
