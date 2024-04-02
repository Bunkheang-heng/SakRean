import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the path as needed
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import ReactPlayer from 'react-player';

const Content = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(4); // Number of videos to display initially

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q = query(collection(db, 'courses'), orderBy('title'));
        const coursesSnapshot = await getDocs(q);
        const coursesData = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    fetchCourses();
  }, []);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle click on "Load More" button
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 4); // Increase display count by 4
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Course List</h1>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by course title..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.slice(0, displayCount).map(course => (
          <li key={course.id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">{course.title}</h2>
            {course.videoType === 'file' && course.video && (
              <div className="aspect-w-16 aspect-h-9">
                <video className="object-cover rounded-lg" controls>
                  <source src={course.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {course.videoType === 'link' && course.videoLink && (
              <div className="aspect-w-16 aspect-h-9">
                <ReactPlayer
                  className="rounded-lg"
                  url={course.videoLink}
                  controls
                  width='100%'
                  height='100%'
                />
                 <p className="text-gray-600 mb-4 text-center">{course.description}</p>
              </div>
              
            )}
          </li>
        ))}
      </ul>
      {displayCount < filteredCourses.length && (
        <div className="text-center">
          <button onClick={handleLoadMore} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Content;
