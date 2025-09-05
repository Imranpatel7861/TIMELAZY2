import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Setting = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    organization: '',
    phone: '',
    address: '',
    profilePic: null,
    profilePicURL: 'https://via.placeholder.com/100',
  });

  const navigate = useNavigate();

  // ✅ Load current profile on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      axios
        .get(`http://localhost:5000/api/profile?email=${storedEmail}`)
        .then((res) => {
          if (res.data) {
            setFormData((prev) => ({
              ...prev,
              name: res.data.name || '',
              email: res.data.email || '',
              gender: res.data.gender || '',
              organization: res.data.organization || '',
              phone: res.data.phone || '',
              address: res.data.address || '',
              profilePicURL: res.data.profile_pic || 'https://via.placeholder.com/100',
            }));

            // Store latest in localStorage for Admindash
            if (res.data.profile_pic) {
              localStorage.setItem('profileImage', res.data.profile_pic);
            }
            if (res.data.name) {
              localStorage.setItem('userName', res.data.name);
            }
            if (res.data.email) {
              localStorage.setItem('userEmail', res.data.email);
            }
          }
        })
        .catch((err) => {
          console.error('Failed to fetch profile:', err);
        });
    }
  }, []);

  const handleChangePasswordClick = () => {
    navigate('/ForgotPassword');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto') {
      const file = files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          profilePic: file,
          profilePicURL: url,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('gender', formData.gender);
    payload.append('organization', formData.organization);
    payload.append('phone', formData.phone);
    payload.append('address', formData.address);
    if (formData.profilePic) {
      payload.append('profilePic', formData.profilePic);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/profile', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Changes saved!');

      // ✅ Update localStorage instantly for Admindash
      if (res.data && res.data.profile_pic) {
        localStorage.setItem('profileImage', res.data.profile_pic);
      }
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', formData.email);
    } catch (err) {
      console.error('Profile update failed:', err);
      alert('Failed to save changes.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={formData.profilePicURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your account information</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Organization Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleChangePasswordClick}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;