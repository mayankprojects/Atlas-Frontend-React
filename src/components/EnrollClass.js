import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AtlasService from '../service/AtlasService';

const EnrollClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [atlas, setAtlas] = useState({
    instructor_name: "",
    discipline: "",
    location: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollmentInfo, setEnrollmentInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AtlasService.getAtlasById(id);
        setAtlas(response.data);
        setLoading(false);
      } catch(error) {
        console.log(error);
        setError("Failed to load class information");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentInfo({ ...enrollmentInfo, [name]: value });
  };

  const handleEnroll = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!enrollmentInfo.name || !enrollmentInfo.email || !enrollmentInfo.phone) {
      setError("Please fill in all fields");
      return;
    }

    // In a real application, you would send this to the backend
    // For now, we'll just store enrollment in localStorage
    const storedEnrollments = localStorage.getItem('enrolledClasses');
    let enrolledClasses = storedEnrollments ? JSON.parse(storedEnrollments) : [];
    
    // Add this class ID if not already enrolled
    if (!enrolledClasses.includes(atlas.id)) {
      enrolledClasses.push(atlas.id);
      localStorage.setItem('enrolledClasses', JSON.stringify(enrolledClasses));
    }
    
    // Store enrollment details
    const enrollmentDetails = JSON.parse(localStorage.getItem('enrollmentDetails') || '{}');
    enrollmentDetails[atlas.id] = {
      ...enrollmentInfo,
      classDetails: {
        instructor: atlas.instructor_name,
        discipline: atlas.discipline,
        location: atlas.location
      },
      enrollmentDate: new Date().toISOString()
    };
    localStorage.setItem('enrollmentDetails', JSON.stringify(enrollmentDetails));
    
    // Navigate back to class list
    navigate('/');
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto my-8 bg-white shadow-lg rounded-lg">
      <div className="text-3xl text-red-600 font-bold text-center pt-8 pb-6">
        <p>Enroll in Class</p>
      </div>

      <div className="px-10 py-6">
        <div className="mb-8 bg-gray-50 p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Class Information</h2>
          <p className="mb-2"><span className="font-medium">Instructor:</span> {atlas.instructor_name}</p>
          <p className="mb-2"><span className="font-medium">Discipline:</span> {atlas.discipline}</p>
          <p className="mb-2"><span className="font-medium">Location:</span> {atlas.location}</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleEnroll}>
          <div className="mb-6">
            <label className="block text-gray-800 mb-2 text-lg font-medium">Your Name:</label>
            <input 
              type="text"
              name="name"
              value={enrollmentInfo.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 text-base" 
              placeholder="Full Name"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-800 mb-2 text-lg font-medium">Email:</label>
            <input 
              type="email"
              name="email"
              value={enrollmentInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 text-base" 
              placeholder="Your Email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-800 mb-2 text-lg font-medium">Phone Number:</label>
            <input 
              type="tel"
              name="phone"
              value={enrollmentInfo.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 text-base" 
              placeholder="Your Phone Number"
              required
            />
          </div>

          <div className="flex justify-center space-x-6 pt-4">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md text-lg"
            >
              Enroll
            </button>
            <button 
              type="button"
              onClick={() => navigate("/")}
              className="border border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 px-8 rounded-md text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollClass;