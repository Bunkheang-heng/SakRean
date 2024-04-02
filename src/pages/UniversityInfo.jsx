import React, { useState } from 'react';
import { db } from '../firebase'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore';

const AddUniversityPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const universitiesCollection = collection(db, 'universityInfo');
            const docRef = await addDoc(universitiesCollection, {
                name,
                description,
                imageUrl
            });
            console.log('University added with ID: ', docRef.id);

            setName('');
            setDescription('');
            setImageUrl('');
        } catch (error) {
            console.error('Error adding university: ', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Add University</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    );
};

export default AddUniversityPage;
