import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Setting.module.css';

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
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  // Load current profile on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
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
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size should be less than 5MB');
          return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file');
          return;
        }
        
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
    
    // Basic validation
    if (!formData.name.trim()) {
      alert('Please enter your full name');
      return;
    }
    
    if (!formData.email.trim()) {
      alert('Please enter your email address');
      return;
    }
    
    setIsSaving(true);
    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('email', formData.email.trim());
    payload.append('gender', formData.gender);
    payload.append('organization', formData.organization.trim());
    payload.append('phone', formData.phone.trim());
    payload.append('address', formData.address.trim());
    if (formData.profilePic) {
      payload.append('profilePic', formData.profilePic);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/profile', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Success animation could be added here
      alert('Changes saved successfully!');

      // Update localStorage instantly for Admindash
      if (res.data && res.data.profile_pic) {
        localStorage.setItem('profileImage', res.data.profile_pic);
      }
      localStorage.setItem('userName', formData.name.trim());
      localStorage.setItem('userEmail', formData.email.trim());
    } catch (err) {
      console.error('Profile update failed:', err);
      const errorMessage = err.response?.data?.message || 'Failed to save changes. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.profileHeader}>
        <img
          src={formData.profilePicURL}
          alt="Profile"
          className={styles.avatar}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150?text=Profile';
          }}
        />
        <div>
          <h2 className={styles.heading}>Profile Settings</h2>
          <p className={styles.subheading}>Manage your account information</p>
        </div>
      </div>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>

        <div className={styles.inputGroup}>
          <label htmlFor="profilePhoto">Profile Picture</label>
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            className={styles.inputFile}
            disabled={isLoading || isSaving}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={styles.input}
            required
            disabled={isLoading || isSaving}
            maxLength={100}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className={styles.input}
            required
            disabled={isLoading || isSaving}
            maxLength={100}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.input}
            disabled={isLoading || isSaving}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Organization</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Enter your organization name"
            className={styles.input}
            disabled={isLoading || isSaving}
            maxLength={100}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={styles.input}
            disabled={isLoading || isSaving}
            maxLength={15}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className={styles.input}
            rows="3"
            disabled={isLoading || isSaving}
            maxLength={500}
            style={{ resize: 'vertical', minHeight: '80px' }}
          />
        </div>

        <div className={styles.buttonRow}>
          <button 
            type="submit" 
            className={styles.saveBtn}
            disabled={isLoading || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            className={styles.passwordBtn}
            onClick={handleChangePasswordClick}
            disabled={isLoading || isSaving}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;