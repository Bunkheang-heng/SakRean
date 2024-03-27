import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { ref, uploadBytes } from 'firebase/storage';

const CreateListing = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    videoType: 'file', // Default to file upload
    video: null,
    videoLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    // Check if the uploaded file is a video
    if (file && file.type.startsWith('video/')) {
      setCourseDetails(prevState => ({
        ...prevState,
        video: file
      }));
    } else {
      alert('Please upload a valid video file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, videoType, video, videoLink } = courseDetails;

    try {
      let downloadURL = '';

      if (videoType === 'file' && video) {

        const storageRef = ref(storage, `videos/${video.name}`);
        await uploadBytes(storageRef, video);

        downloadURL = await storageRef.getDownloadURL();
      }

      const docRef = await addDoc(collection(db, 'courses'), {
        title,
        description,
        videoType,
        video: videoType === 'file' ? downloadURL : null,
        videoLink: videoType === 'link' ? videoLink : null
      });

      const courseId = docRef.id;
      console.log('Document written with ID: ', courseId);

      setCourseDetails({
        title: '',
        description: '',
        videoType: 'file',
        video: null,
        videoLink: ''
      });

      toast.success('Course created successfully!');
    } catch (error) {
      console.error('Error creating course: ', error);
      toast.error('Error creating course. Please try again.');
    }
  };

  return (
    <main>
      <h1 className='text-3xl text-center mt-6 font-bold '>Create Course</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" value={courseDetails.title} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={courseDetails.description} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 resize-none"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Choose Video Option</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="radio" className="form-radio" name="videoType" value="file" checked={courseDetails.videoType === 'file'} onChange={handleChange} />
              <span className="ml-2">Upload File</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input type="radio" className="form-radio" name="videoType" value="link" checked={courseDetails.videoType === 'link'} onChange={handleChange} />
              <span className="ml-2">Provide Link</span>
            </label>
          </div>
        </div>
        {courseDetails.videoType === 'file' &&
          <div className="mb-4">
            <label htmlFor="video" className="block text-sm font-medium text-gray-700">Upload Video</label>
            <input type="file" id="video" name="video" accept="video/*" onChange={handleVideoChange} className="mt-1" />
          </div>
        }
        {courseDetails.videoType === 'link' &&
          <div className="mb-4">
            <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700">Video Link</label>
            <input type="text" id="videoLink" name="videoLink" value={courseDetails.videoLink} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
        }
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
    </main>
  );
}

export default CreateListing;
