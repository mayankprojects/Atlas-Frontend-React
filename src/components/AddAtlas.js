import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AtlasService from '../service/AtlasService';

const AddAtlas = () => {
  const [atlas, setAtlas] = useState({
    instructor_name: "",
    discipline: "",
    location: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setAtlas({...atlas, [e.target.name]: value});
  }

  const saveAtlas = (e) => {
    e.preventDefault();
    AtlasService.saveAtlas(atlas)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const reset = (e) => {
    e.preventDefault();
    setAtlas({
      instructor_name: "",
      discipline: "",
      location: ""
    });
  }

  const navigate = useNavigate();

  return (
    <div className='max-w-xl mx-auto my-8 bg-white shadow-lg rounded-lg'>
      <div className='text-3xl text-red-600 font-bold text-center pt-8 pb-6'>
        <p>Add New Instructor</p>
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
          onClick={saveAtlas}
          className='bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md text-lg'
        >
          Save
        </button>
        <button 
          onClick={reset}
          className='bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-md text-lg'
        >
          Clear
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

export default AddAtlas;