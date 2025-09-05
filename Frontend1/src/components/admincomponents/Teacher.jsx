import React, { useState, useRef, useEffect } from 'react';
import { Users, Edit3, Trash2, Plus, Upload, X } from 'lucide-react';

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    abbreviation: '',
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      fetchTeachersByAdmin(user.id);
    }
  }, []);

  const fetchTeachersByAdmin = async (adminId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/teachers?admin_id=${adminId}`);
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error('Failed to fetch teachers', error);
    }
  };

  const generateAbbreviation = (name) => {
    return name
      .split(' ')
      .map(part => part[0]?.toUpperCase())
      .join('');
  };

  const handleAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({ name: '', subject: '', email: '', abbreviation: '' });
  };

  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setFormData(teacher);
    setIsEditing(true);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this teacher?');
    if (confirmed) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Optimistic UI update
        setTeachers(prev => prev.filter(t => t.id !== id));

        const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete teacher');
        }

        // Refresh from backend to stay in sync
        fetchTeachersByAdmin(user.id);
      } catch (error) {
        console.error('Error deleting teacher:', error);
        // Revert optimistic update on error
        fetchTeachersByAdmin(JSON.parse(localStorage.getItem('user')).id);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'name') {
      const newAbbreviation = generateAbbreviation(value);
      setFormData(prev => ({
        ...prev,
        abbreviation: newAbbreviation,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const payload = {
        ...formData,
        admin_id: user.id
      };

      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:5000/api/teachers/${currentTeacher.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('http://localhost:5000/api/teachers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save teacher');
      }

      fetchTeachersByAdmin(user.id);
      resetForm();
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentTeacher(null);
    setFormData({
      name: '',
      subject: '',
      email: '',
      abbreviation: '',
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const parsedData = parseFileContent(content);
        setTeachers(prev => [...prev, parsedData]);
      };
      reader.readAsText(file);
    }
  };

  const parseFileContent = (content) => {
    const defaultName = 'Uploaded Teacher';
    return {
      id: Math.max(0, ...teachers.map(t => t.id)) + 1,
      name: defaultName,
      subject: 'Unknown',
      email: 'uploaded@eduadmin.com',
      abbreviation: generateAbbreviation(defaultName),
    };
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const parsedData = parseFileContent(content);
        setTeachers(prev => [...prev, parsedData]);
      };
      reader.readAsText(file);
    }
  };

  const getRandomColor = () => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users size={28} className="text-blue-500" />
          Teachers Management
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Teacher
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <Upload size={20} />
            Upload
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept=".pdf,.txt,.doc,.docx"
          />
        </div>
      </div>

      {/* Teachers Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        onDragOver={handleDragOver} 
        onDrop={handleDrop}
      >
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: getRandomColor() }}
              >
                {getInitials(teacher.name)}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="text-2xl font-bold text-blue-600">
                  {teacher.abbreviation}
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{teacher.name}</h4>
                <p className="text-sm">
                  <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                    {teacher.subject}
                  </span>
                </p>
                <p className="text-sm">
                  <a 
                    href={`mailto:${teacher.email}`} 
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {teacher.email}
                  </a>
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => handleEdit(teacher)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Edit teacher"
                >
                  <Edit3 size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(teacher.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete teacher"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Teacher Details' : 'Add New Teacher'}
                </h3>
                <button 
                  onClick={resetForm}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="abbreviation" className="block text-sm font-medium text-gray-700 mb-1">
                    Abbreviation
                  </label>
                  <input
                    type="text"
                    id="abbreviation"
                    name="abbreviation"
                    value={formData.abbreviation}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Enter subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    {isEditing ? 'Update Teacher' : 'Add Teacher'}
                  </button>
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;