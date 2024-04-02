
import React from 'react';
import { useParams } from 'react-router-dom';

const CourseList = () => {
  const { courseId } = useParams();

  // Fetch course data based on courseId
  // Example:
  // const courseData = fetchCourse(courseId);

  // Dummy course data
  const courseData = {
    id: courseId,
    title: `Course ${courseId}`,
    // Add more properties as needed
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{courseData.title}</h1>
      {/* Display videos for the course */}
      {/* Example: */}
      {/* <VideoList courseId={courseId} /> */}
    </div>
  );
}

export default CourseList;
