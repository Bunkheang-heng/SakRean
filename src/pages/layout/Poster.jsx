import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Poster.css"; // Import the CSS file

const Poster = () => {
  return (
    <div className="poster-container"> {/* Apply the poster-container class */}
      <h1>Unlock Your Career Path</h1>
      <div>
        <h2>With Online Assessment and Tryout Courses</h2>
        <p>Learn From Industry Experts and Enhance Your Skills</p>
      </div>
      <div>
        <button className="bg-yellow-500 w-40 h-10 rounded-xl text-white font-bold hover:bg-yellow-400">
          <Link to="/content">Explore Course</Link>
        </button>

        <button className="bg-white w-40 h-10 rounded-xl text-black font-bold hover:bg-gray-400 ml-5">
          <Link to="/universityInfo">View University</Link>
        </button>
      </div>
    </div>
  );
};

export default Poster;
