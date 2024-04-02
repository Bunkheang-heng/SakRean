import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs, query, where, orderBy, startAt, endAt } from 'firebase/firestore';

const UniversityPage = () => {
    const [universities, setUniversities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const universitiesCollection = collection(db, 'universityInfo');
                const q = query(universitiesCollection, 
                    orderBy('name'),
                    startAt(searchTerm),
                    endAt(searchTerm + "\uf8ff")
                );
                const universitiesSnapshot = await getDocs(q);
                const universitiesData = universitiesSnapshot.docs.map(doc => doc.data());
                setUniversities(universitiesData);
            } catch (error) {
                console.error('Error fetching universities: ', error);
            }
        };

        fetchUniversities();
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Universities</h1>
                <input
                    type="text"
                    placeholder="Search by university name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map((university, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                        <img src={university.imageUrl} alt={university.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-lg font-semibold mb-2 text-center">{university.name}</h2>
                        <p className="text-gray-600 mb-4">{university.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UniversityPage;
