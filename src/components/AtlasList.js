import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AtlasService from '../service/AtlasService';

const AtlasList = () => {
  const [loading, setLoading] = useState(true);
  const [atlases, setAtlases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AtlasService.getAtlasList();
        setAtlases(response.data);
      } catch(error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteAtlas = (e, id) => {
    e.preventDefault();
    AtlasService.deleteAtlas(id)
      .then(() => {
        setAtlases(atlases.filter(atlas => atlas.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editAtlas = (e, id) => {
    e.preventDefault();
    navigate(`/editAtlas/${id}`);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-8">AHA Available Classes</h1>
      
      <div className="w-full mb-8 text-center">
        <button
          onClick={() => navigate("/addAtlas")}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md shadow text-lg"
        >
          Add Class 📚
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-500">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Instructor Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Discipline
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white divide-y divide-gray-200">
              {atlases.map((atlas) => (
                <tr key={atlas.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-base">{atlas.instructor_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-base">{atlas.discipline}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-base">{atlas.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-6">
                    <button
                      onClick={(e) => editAtlas(e, atlas.id)}
                      className="text-green-600 hover:text-green-900 hover:underline text-base font-medium"
                    >
                      Edit 📝
                    </button>
                    <button
                      onClick={(e) => deleteAtlas(e, atlas.id)}
                      className="text-red-600 hover:text-red-900 hover:underline text-base font-medium"
                    >
                      Delete 🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default AtlasList;   