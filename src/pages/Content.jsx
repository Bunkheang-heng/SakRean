import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';
import ReactPlayer from 'react-player';

const Content = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Course List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
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
    </div>
  );
}

export default Content;
