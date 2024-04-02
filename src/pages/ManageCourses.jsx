import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the path as needed
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const ManageListings = () => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    title: '',
    description: '',
    videoType: 'file',
    video: null,
    videoLink: ''
  });

  // Function to fetch listings from Firestore
  const fetchListings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings: ', error);
      toast.error('Error fetching listings. Please try again.');
    }
  };

  useEffect(() => {
    fetchListings();
  }, []); // Fetch listings on component mount

  // Function to delete a listing
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'courses', id));
      setListings(prevListings => prevListings.filter(listing => listing.id !== id));
      toast.success('Listing deleted successfully!');
    } catch (error) {
      console.error('Error deleting listing: ', error);
      toast.error('Error deleting listing. Please try again.');
    }
  };

  // Function to open modal for updating listing
  const openUpdateModal = (listing) => {
    setSelectedListing(listing);
    setUpdatedDetails({
      title: listing.title,
      description: listing.description,
      videoType: listing.videoType,
      video: null,
      videoLink: listing.videoLink
    });
  };

  // Function to handle input changes in the update form
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to update a listing
  const handleUpdate = async () => {
    const { id } = selectedListing;

    try {
      await updateDoc(doc(db, 'courses', id), updatedDetails);
      fetchListings(); // Refresh listings after update
      toast.success('Listing updated successfully!');
    } catch (error) {
      console.error('Error updating listing: ', error);
      toast.error('Error updating listing. Please try again.');
    }

    setSelectedListing(null); // Close the update modal
  };

  return (
    <main>
      <h1 className='text-3xl text-center mt-6 font-bold'>Manage Listings</h1>
      <ul className="max-w-lg mx-auto mt-8">
        {listings.map(listing => (
          <li key={listing.id} className="mb-4">
            <p><strong>Title:</strong> {listing.title}</p>
            <p><strong>Description:</strong> {listing.description}</p>
            {listing.videoType === 'file' &&
              <p><strong>Video:</strong> <a href={listing.video}>Download</a></p>
            }
            {listing.videoType === 'link' &&
              <p><strong>Video Link:</strong> {listing.videoLink}</p>
            }
            <div>
              <button onClick={() => handleDelete(listing.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Delete</button>
              <button onClick={() => openUpdateModal(listing)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Update</button>
            </div>
          </li>
        ))}
      </ul>
      {selectedListing && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Update Listing</h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" name="title" value={updatedDetails.title} onChange={handleUpdateFormChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" name="description" value={updatedDetails.description} onChange={handleUpdateFormChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 resize-none"></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Choose Video Option</label>
                        <div className="mt-2">
                          <label className="inline-flex items-center">
                            <input type="radio" className="form-radio" name="videoType" value="file" checked={updatedDetails.videoType === 'file'} onChange={handleUpdateFormChange} />
                            <span className="ml-2">Upload File</span>
                          </label>
                          <label className="inline-flex items-center ml-6">
                            <input type="radio" className="form-radio" name="videoType" value="link" checked={updatedDetails.videoType === 'link'} onChange={handleUpdateFormChange} />
                            <span className="ml-2">Provide Link</span>
                          </label>
                        </div>
                      </div>
                      {updatedDetails.videoType === 'link' &&
                        <div className="mb-4">
                          <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700">Video Link</label>
                          <input type="text" id="videoLink" name="videoLink" value={updatedDetails.videoLink} onChange={handleUpdateFormChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleUpdate} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Update
                </button>
                <button onClick={() => setSelectedListing(null)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ManageListings;
