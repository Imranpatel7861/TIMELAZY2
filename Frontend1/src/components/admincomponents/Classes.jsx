import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Building2 } from 'lucide-react';

const Classes = () => {
  const [classrooms, setClassrooms] = useState([
    { id: 1, classroom_number: '101' },
    { id: 2, classroom_number: '102' },
    { id: 3, classroom_number: '201' }
  ]);
  const [newClassroom, setNewClassroom] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Note: In your actual implementation, add back:
  // import axios from 'axios';
  // and uncomment the actual API calls below

  let adminId = null;
  try {
    const storedUser = localStorage?.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      adminId = parsedUser?.id || null;
    }
  } catch (err) {
    console.error('Failed to parse user from localStorage:', err);
  }

  const API_BASE = 'http://localhost:5000/api/classrooms';

  const fetchClassrooms = async () => {
    if (!adminId) {
      setError('Admin ID is missing — please log in.');
      return;
    }
    setLoading(true);
    try {
      // Replace with actual axios call:
      // const res = await axios.get(API_BASE, {
      //   params: { admin_id: adminId }
      // });
      // setClassrooms(res.data);
      
      // Demo data for now
      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 1000);
    } catch (err) {
      console.error(err);
      setError('Error fetching classrooms');
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchClassrooms(); // Uncomment when using real API
  }, [adminId]);

  const handleAdd = async () => {
    if (!adminId) {
      setError('Cannot add classroom — Admin ID is missing.');
      return;
    }
    const trimmed = newClassroom.trim();
    if (!trimmed) {
      setError('Classroom number is required');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (classrooms.some(cls => String(cls.classroom_number) === trimmed)) {
      setError('Classroom already exists');
      setTimeout(() => setError(''), 3000);
      return;
    }
    try {
      // Replace with actual axios call:
      // await axios.post(API_BASE, {
      //   classroom_number: trimmed,
      //   admin_id: adminId
      // });
      
      // Demo functionality
      const newId = Math.max(...classrooms.map(c => c.id)) + 1;
      setClassrooms([...classrooms, { id: newId, classroom_number: trimmed }]);
      setNewClassroom('');
      setShowModal(false);
      // fetchClassrooms(); // Uncomment when using real API
    } catch (err) {
      console.error(err);
      setError('Failed to add classroom');
    }
  };

  const handleDelete = async (classroomId) => {
    if (!adminId) {
      setError('Cannot delete classroom — Admin ID is missing.');
      return;
    }
    try {
      // Replace with actual axios call:
      // await axios.delete(`${API_BASE}/${classroomId}`, {
      //   params: { admin_id: adminId }
      // });
      
      // Demo functionality
      setClassrooms(classrooms.filter(c => c.id !== classroomId));
      // fetchClassrooms(); // Uncomment when using real API
    } catch (err) {
      console.error(err);
      setError('Failed to delete classroom');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 sm:mb-8 text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Classroom Management
        </h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            Loading classrooms...
          </div>
        ) : classrooms.length === 0 ? (
          <div className="text-center py-16 text-gray-500 flex flex-col items-center gap-4">
            <Building2 size={48} className="text-gray-400" />
            <p>No classrooms found. Add one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {classrooms.map((classroom) => (
              <div
                key={classroom.id}
                className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <Building2 size={24} className="text-blue-500 flex-shrink-0" />
                  <span className="text-lg sm:text-xl font-semibold text-slate-900">
                    Room {classroom.classroom_number}
                  </span>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-all duration-200 hover:scale-105 flex-shrink-0"
                  onClick={() => handleDelete(classroom.id)}
                  aria-label={`Delete classroom ${classroom.classroom_number}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center z-50"
        onClick={() => setShowModal(true)}
      >
        <Plus size={24} />
      </button>

      {/* Add Classroom Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
          showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
            Add Classroom
          </h3>
          <input
            type="number"
            value={newClassroom}
            onChange={(e) => {
              setNewClassroom(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
            }}
            placeholder="Classroom number"
            className="w-full p-3 sm:p-4 mb-4 sm:mb-6 border border-slate-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-end">
            <button
              className="w-full sm:w-auto px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold transition-colors duration-200"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="w-full sm:w-auto px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors duration-200"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;