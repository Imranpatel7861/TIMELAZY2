import React, { useState, useRef, useEffect } from 'react';
import { Users, Edit3, Trash2, Plus, Upload, GraduationCap, Mail, BookOpen, Sparkles } from 'lucide-react';
import axios from 'axios';
import styles from './Teacher.module.css';

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/teachers?admin_id=${adminId}`);
      setTeachers(response.data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch teachers', error);
      setError('Failed to load teachers');
    }
    setLoading(false);
  };

  const generateAbbreviation = (name) => {
    return name
      .split(' ')
      .map(part => part[0].toUpperCase())
      .join('');
  };

  const handleAdd = () => {
    setIsAdding(true);
    setIsEditing(false);
    setFormData({ name: '', subject: '', email: '', abbreviation: '' });
    setError('');
  };

  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setFormData(teacher);
    setIsEditing(true);
    setIsAdding(false);
    setError('');
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to remove ${name} from the faculty?`);
    if (confirmed) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setTeachers(prev => prev.filter(t => t.id !== id));
        await axios.delete(`http://localhost:5000/api/teachers/${id}`);
        setSuccess(`${name} has been removed successfully`);
        setTimeout(() => setSuccess(''), 3000);
        fetchTeachersByAdmin(user.id);
      } catch (error) {
        console.error('Error deleting teacher:', error);
        setError('Failed to remove teacher');
        fetchTeachersByAdmin(user.id);
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
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const payload = {
        ...formData,
        admin_id: user.id
      };
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/teachers/${currentTeacher.id}`, payload);
        setSuccess(`${formData.name} has been updated successfully`);
      } else {
        await axios.post('http://localhost:5000/api/teachers', payload);
        setSuccess(`${formData.name} has been added to faculty`);
      }
      setTimeout(() => setSuccess(''), 3000);
      fetchTeachersByAdmin(user.id);
      resetForm();
    } catch (error) {
      console.error('Error saving teacher:', error);
      setError('Failed to save teacher information');
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
    setError('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const parsedData = parseFileContent(content);
        setTeachers(prev => [...prev, parsedData]);
        setSuccess(`Teacher data uploaded from ${file.name}`);
        setTimeout(() => setSuccess(''), 3000);
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
        setSuccess(`Teacher data uploaded via drag & drop`);
        setTimeout(() => setSuccess(''), 3000);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.titleContainer}>
          <GraduationCap className={styles.titleIcon} size={32} />
          <h2 className={styles.title}>Faculty Management</h2>
          <Sparkles className={styles.titleIcon2} size={32} />
        </div>
        <p className={styles.subtitle}>Advanced educator administration system</p>

        {/* Action Buttons */}
        <div className={styles.actionBar}>
          <button className={styles.addBtn} onClick={handleAdd}>
            <Plus size={20} />
            Add Faculty Member
          </button>
          <button className={styles.uploadBtn} onClick={() => fileInputRef.current.click()}>
            <Upload size={20} />
            Import Data
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept=".pdf,.txt,.doc,.docx"
          />
        </div>

        {/* Status Messages */}
        {error && (
          <div className={styles.error}>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className={styles.success}>
            <span>{success}</span>
          </div>
        )}

        {/* Form Section */}
        {(isAdding || isEditing) && (
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <div className={styles.formIconWrapper}>
                <Users size={24} />
              </div>
              <h3 className={styles.formTitle}>
                {isEditing ? 'Update Faculty Member' : 'Add New Faculty Member'}
              </h3>
              <p className={styles.formSubtitle}>
                {isEditing ? 'Modify existing faculty information' : 'Enter new faculty member details'}
              </p>
            </div>
            <form onSubmit={handleSubmit} className={styles.teacherForm}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="abbreviation">Abbreviation</label>
                  <input
                    type="text"
                    id="abbreviation"
                    name="abbreviation"
                    value={formData.abbreviation}
                    onChange={handleInputChange}
                    readOnly
                    className={`${styles.formInput} ${styles.readOnly}`}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="subject">Subject/Department</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Enter subject or department"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                  />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  {isEditing ? (
                    <>
                      <Edit3 size={16} />
                      Update Faculty
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add Faculty
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Teachers List */}
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading faculty members...</p>
            </div>
          ) : teachers.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <GraduationCap size={64} />
              </div>
              <h3>No Faculty Members Found</h3>
              <p>Start building your academic team by adding faculty members</p>
            </div>
          ) : (
            <div className={styles.teachersList} onDragOver={handleDragOver} onDrop={handleDrop}>
              {teachers.map((teacher) => (
                <div key={teacher.id} className={styles.teacherCard}>
                  <div className={styles.cardGlow}></div>
                  <div className={styles.teacherInfo}>
                    <div className={styles.avatar} style={{ backgroundColor: getRandomColor() }}>
                      {getInitials(teacher.name)}
                    </div>
                    <div className={styles.teacherDetails}>
                      <div className={styles.teacherHeader}>
                        <h4 className={styles.teacherName}>{teacher.name}</h4>
                        <span className={styles.teacherAbbreviation}>
                          {teacher.abbreviation}
                        </span>
                      </div>
                      <div className={styles.teacherMeta}>
                        <div className={styles.metaItem}>
                          <BookOpen size={14} />
                          <span className={styles.subjectBadge}>{teacher.subject}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <Mail size={14} />
                          <a href={`mailto:${teacher.email}`} className={styles.teacherEmail}>
                            {teacher.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(teacher)}
                      aria-label="Edit teacher"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(teacher.id, teacher.name)}
                      aria-label="Delete teacher"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Background decorations */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
        <div className={styles.bgCircle4}></div>
      </div>
    </div>
  );
};

const getRandomColor = () => {
  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f97316',
    '#10b981', '#06b6d4', '#84cc16', '#f59e0b',
    '#ef4444', '#3b82f6', '#14b8a6', '#a855f7'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default Teacher;
