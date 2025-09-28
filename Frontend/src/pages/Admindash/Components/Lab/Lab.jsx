import React, { useState, useRef, useEffect } from 'react';
import { FlaskConical, Trash2, Plus, Beaker, Sparkles, Atom } from 'lucide-react';
import axios from 'axios';
import styles from './Lab.module.css';

const Lab = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newLab, setNewLab] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.id) {
      fetchLabsByAdmin(user.id);
    }
  }, []);

  const fetchLabsByAdmin = async (adminId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/labs?admin_id=${adminId}`);
      setLabs(response.data);
    } catch (error) {
      console.error('Failed to fetch labs', error);
      setError('Failed to fetch laboratories');
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newLab.trim()) {
      setError('Lab name cannot be empty.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    try {
      const payload = {
        lab_name: newLab.trim(),
        description: 'Newly added lab',
        admin_id: user.id,
      };
      await axios.post('http://localhost:5000/api/labs', payload);
      setSuccess(`Lab "${newLab}" added successfully.`);
      setTimeout(() => setSuccess(''), 3000);
      setNewLab('');
      setShowModal(false);
      fetchLabsByAdmin(user.id);
    } catch (error) {
      console.error('Error adding lab:', error);
      setError('Failed to add lab.');
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete lab "${name}"?`);
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/labs/${id}?admin_id=${user.id}`);
        setSuccess(`Lab "${name}" deleted successfully.`);
        setTimeout(() => setSuccess(''), 3000);
        fetchLabsByAdmin(user.id);
      } catch (error) {
        console.error('Error deleting lab:', error);
        setError('Failed to delete lab.');
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const parsedData = parseFileContent(reader.result);
        setLabs((prev) => [...prev, parsedData]);
        setSuccess(`Lab from file "${file.name}" uploaded successfully.`);
        setTimeout(() => setSuccess(''), 3000);
      };
      reader.readAsText(file);
    }
  };

  const parseFileContent = (content) => {
    return {
      id: Math.max(0, ...labs.map((lab) => lab.id)) + 1,
      lab_name: 'Uploaded Lab',
      description: 'Uploaded via file',
    };
  };

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Atom className={styles.titleIcon} size={32} />
          <h2 className={styles.title}>Laboratory Management</h2>
          <FlaskConical className={styles.titleIcon2} size={32} />
        </div>
        <p className={styles.subtitle}>Advanced lab space organization system</p>

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

        <main className={styles.content}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.loadingSpinner}></div>
              <p>Analyzing laboratory systems...</p>
            </div>
          ) : labs.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FlaskConical size={64} />
              </div>
              <h3>No laboratories detected</h3>
              <p>Initialize your first laboratory to begin scientific operations</p>
            </div>
          ) : (
            <div className={styles.labGrid}>
              {labs.map((lab) => (
                <article key={lab.id} className={styles.labCard}>
                  <div className={styles.cardGlow}></div>
                  <div className={styles.cardHeader}>
                    <div className={styles.labIcon}>
                      <Beaker size={24} />
                    </div>
                    <div className={styles.labInfo}>
                      <span className={styles.labLabel}>Laboratory</span>
                      <h2 className={styles.labNumber}>{lab.lab_name}</h2>
                    </div>
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(lab.id, lab.lab_name)}
                    aria-label={`Delete laboratory ${lab.lab_name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Action Button */}
      <button className={styles.fab} onClick={() => setShowModal(true)}>
        <Plus size={24} />
        <span className={styles.fabRipple}></span>
      </button>

      {/* Add Laboratory Modal */}
      <div className={`${styles.modal} ${showModal ? styles.active : ''}`}>
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}></div>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.modalIconWrapper}>
              <Beaker size={24} />
            </div>
            <h3>Create New Laboratory</h3>
            <p>Enter a unique laboratory identifier</p>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={newLab}
              onChange={(e) => {
                setNewLab(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd();
              }}
              placeholder="Enter lab identifier (e.g., A101, CHEM-LAB-B)"
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
              <Beaker size={16} />
              Create Laboratory
            </button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        accept=".pdf,.txt,.doc,.docx"
      />

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

export default Lab;