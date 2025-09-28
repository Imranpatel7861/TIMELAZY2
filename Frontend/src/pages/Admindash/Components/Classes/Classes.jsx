import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Building2, Sparkles } from 'lucide-react';
import styles from './Classes.module.css';

const Classes = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [newClassroom, setNewClassroom] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let adminId = null;
  try {
    const storedUser = localStorage.getItem('user');
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
      const res = await axios.get(API_BASE, {
        params: { admin_id: adminId }
      });
      setClassrooms(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error fetching classrooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassrooms();
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
      await axios.post(API_BASE, {
        classroom_number: trimmed,
        admin_id: adminId
      });
      setNewClassroom('');
      setShowModal(false);
      fetchClassrooms();
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
      await axios.delete(`${API_BASE}/${classroomId}`, {
        params: { admin_id: adminId }
      });
      fetchClassrooms();
    } catch (err) {
      console.error(err);
      setError('Failed to delete classroom');
    }
  };

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Sparkles className={styles.titleIcon} size={32} />
          <h2 className={styles.title}>Classroom Management</h2>
        </div>
        
        {error && (
          <div className={styles.error}>
            <span>{error}</span>
          </div>
        )}
        
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading classrooms...</p>
          </div>
        ) : classrooms.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Building2 size={64} />
            </div>
            <h3>No classrooms yet</h3>
            <p>Create your first classroom to get started</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {classrooms.map((classroom) => (
              <div key={classroom.id} className={styles.card}>
                <div className={styles.cardGlow}></div>
                <div className={styles.classInfo}>
                  <div className={styles.iconWrapper}>
                    <Building2 size={24} />
                  </div>
                  <div className={styles.roomInfo}>
                    <span className={styles.roomLabel}>Room</span>
                    <span className={styles.roomNumber}>
                      {classroom.classroom_number}
                    </span>
                  </div>
                </div>
                <button
                  className={styles.deleteBtn}
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
      <button className={styles.fab} onClick={() => setShowModal(true)}>
        <Plus size={24} />
        <span className={styles.fabRipple}></span>
      </button>

      {/* Add Classroom Modal */}
      <div className={`${styles.modal} ${showModal ? styles.active : ''}`}>
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}></div>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3>Add New Classroom</h3>
            <p>Enter a unique classroom number</p>
          </div>
          <div className={styles.inputContainer}>
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
              placeholder="Enter classroom number"
              className={styles.modalInput}
              autoFocus
            />
          </div>
          <div className={styles.modalButtons}>
            <button
              className={`${styles.modalBtn} ${styles.modalBtnSecondary}`}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className={`${styles.modalBtn} ${styles.modalBtnPrimary}`}
              onClick={handleAdd}
            >
              <Plus size={16} />
              Add Classroom
            </button>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
      </div>
    </div>
  );
};

export default Classes;