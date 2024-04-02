import React from 'react';
import Image1 from "../assets/image/photo1.jpg"
import "../assets/css/Home.css"

const AboutMe = () => {
  return (
    <div className="home-container">
      <header>
        <h1>BUNKHEANG HENG</h1>
        <p className='uppercase'>A Computer Science Student</p>
        
      </header>
      <section className="about-section flex justify-between items-center ">
      <img src={Image1} alt="HENG Bunkheang" className='w-[150px] border-r-50% mr-5'/>
      <div>
        <h2 className='mr-6'>About Me</h2>
        <p>I am a passionate and skilled Full 
          Stack Developer with experience in building 
          web applications using modern technologies 
          such as React.js, Node.js, and Firebase.</p>
          </div>
      </section>
      <section className="skills-section">
        <h2>Skills</h2>
        <ul>
          <li>JavaScript (ES6+)</li>
          <li>React.js</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>HTML5 / CSS3</li>
        </ul>
      </section>
      <section className="projects-section">
        <h2>Projects</h2>
        <div className="project">
          <h3>Portfolio Website</h3>
          <p>A personal portfolio website showcasing my skills and projects.</p>
          <a href="https://github.com/johndoe/portfolio" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
        {/* Add more projects here */}
      </section>
      <section className="experience-section">
        <h2>Experience</h2>
        <div className="experience">
          <h3>Full Stack Developer - Save The Children</h3>
          <p>Implemented new features and enhancements for 
            the company's web application using React.js and Firebase.</p>
        </div>
      </section>
      <section className="contact-section">
        <h2>Contact Me</h2>
        <p>Feel free to reach out to me for collaboration opportunities or project inquiries.</p>
        <ul>
          <li>Email: bunkheangheng99@gmail.com</li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/bunkheang-heng-200b25297/" target="_blank" rel="noopener noreferrer">linkedin.com/in/johndoe</a></li>
          <li>GitHub: <a href="https://github.com/Bunkheang-heng" target="_blank" rel="noopener noreferrer">github.com/johndoe</a></li>
          <li>Tele: 0973556059</li>
        
        </ul>
      </section>
      <footer>
        <p>&copy; 2024 HENG Bunkheang. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutMe;
