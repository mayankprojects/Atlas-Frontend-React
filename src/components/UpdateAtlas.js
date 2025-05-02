import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AtlasService from '../service/AtlasService';

const UpdateAtlas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [atlas, setAtlas] = useState({
    instructor_name: "",
    discipline: "",
    location: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setAtlas({...atlas, [e.target.name]: value});
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AtlasService.getAtlasById(id);
        setAtlas(response.data);
      } catch(error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const updateAtlas = (e) => {
    e.preventDefault();
    AtlasService.updateAtlas(atlas, id)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='max-w-xl mx-auto my-8 bg-white shadow-lg rounded-lg'>
      <div className='text-3xl text-red-600 font-bold text-center pt-8 pb-6'>
        <p>Update Instructor</p>
      </div>

      <div className='px-10 py-6'>
        <div className="mb-6">
          <label className="block text-gray-800 mb-2 text-lg font-medium">Instructor Name:</label>
          <input 
            type='text'
            name="instructor_name"
            value={atlas.instructor_name}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 text-base" 
            placeholder='Instructor Name'
          />
        </div>
       
        <div className="mb-6">
          <label className="block text-gray-800 mb-2 text-lg font-medium">Discipline:</label>
          <input
            type='text'
            name='discipline'
            value={atlas.discipline}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 text-base" 
            placeholder='Discipline'
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-800 mb-2 text-lg font-medium">Location:</label>
          <input 
            type='text'
            name='location'
            value={atlas.location}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 text-base" 
            placeholder='Location'
          />
        </div>
      </div>

      <div className='flex justify-center space-x-6 pb-8'>
        <button
          onClick={updateAtlas}
          className='bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md text-lg'
        >
          Update
        </button>
        <button 
          onClick={() => navigate("/")}
          className='border border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 px-8 rounded-md text-lg'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateAtlas;
