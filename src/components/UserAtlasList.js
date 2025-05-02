import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AtlasService from '../service/AtlasService';

const UserAtlasList = () => {
  const [loading, setLoading] = useState(true);
  const [atlases, setAtlases] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get all classes
        const response = await AtlasService.getAtlasList();
        setAtlases(response.data);
        
        // Get enrolled classes from local storage
        const storedEnrollments = localStorage.getItem('enrolledClasses');
        if (storedEnrollments) {
          setEnrolledClasses(JSON.parse(storedEnrollments));
        }
      } catch(error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const enrollClass = (e, id) => {
    e.preventDefault();
    navigate(`/enrollClass/${id}`);
  };

  const isEnrolled = (id) => {
    return enrolledClasses.includes(id);
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-8">AHA Available Classes</h1>
      
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEnrolled(atlas.id) ? (
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-md font-medium">
                        Enrolled ✓
                      </span>
                    ) : (
                      <button
                        onClick={(e) => enrollClass(e, atlas.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
                      >
                        Enroll Now
                      </button>
                    )}
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

export default UserAtlasList;
