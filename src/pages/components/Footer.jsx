import React from 'react'; 
import "../../assets/css/Footer.css"// Import your CSS file for styling

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About Us</h2>
            <p>
              UniInfo is a user-friendly web platform designed to provide 
              comprehensive information about universities, majors, courses, 
              and career paths. With UniInfo, users can explore various universities 
              and their offerings, including details about majors, admission requirements, 
              and campus facilities. Additionally, UniInfo offers a curated selection of courses 
              across different fields of study, allowing users to deepen their knowledge and explore new 
              areas of interest. The platform also features a self-assessment tool that helps users identify 
              their interests, skills, and preferences, and provides personalized recommendations for majors 
              or career paths that align with their profiles. Whether you're a prospective student exploring 
              your options, a current student looking for course recommendations, or a 
              professional seeking career guidance, UniInfo is your go-to resource for making 
              informed decisions about your education and future career aspirations.
            </p>
            <div className="contact">
              <span>
                <i className="fas fa-phone"></i> +855 973556059
              </span>
              <span>
                <i className="fas fa-envelope"></i> bunkheangheng99@gmail.com
              </span>
            </div>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact-form">
            <h2>Contact Us</h2>
            <form action="#">
              <input
                type="email"
                name="email"
                className="text-input contact-input"
                placeholder="Your email address"
                required
              />
              <textarea
                name="message"
                className="text-input contact-input"
                placeholder="Your message"
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
          <div className="socials">
            <h2>Our Social Media</h2>
            <ul>
              <li>
                <a href="https://www.facebook.com/heng.bunkheang.3/">Facebook</a>
              </li>
              <li>
                <a href="https://www.twitter.com/">Twitter</a>
              </li>
              <li>
                <a href="https://www.instagram.com/gnod_krapj/">Instagram</a>
              </li>
              <li>
                <a href="https://github.com/Bunkheang-heng">Github</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/bunkheang-heng-200b25297/">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCK6diflxT7iMweuxWljKB0g">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <center>
            <p>&copy; {year} UniInfo. All rights reserved.</p>
          </center>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
