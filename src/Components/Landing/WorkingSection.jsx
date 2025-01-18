import React from 'react'

const WorkingSection = () => {
    return (
        <div>
            <section className="how-it-works" id='working'>
                <div className="container">
                    <h2>How StudyMate Works</h2>
                    <ol>
                        <li>
                            <h3>Sign Up</h3>
                            <p>Create an account and start using StudyMate</p>
                        </li>
                        <li>
                            <h3>Set Up Your Study Space</h3>
                            <p>Organize your notes, materials, and goals</p>
                        </li>
                        <li>
                            <h3>Start Studying</h3>
                            <p>Use StudyMate's tools to stay focused and motivated</p>
                        </li>
                        <li>
                            <h3>Get Support</h3>
                            <p>Chat with our AI-powered chatbot for guidance and support</p>
                        </li>
                    </ol>
                </div>
            </section>
        </div>
    );
};

export default WorkingSection;
