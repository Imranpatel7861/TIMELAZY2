import React, { useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FileUpload({ onParsed }) {
  const fileInputRef = useRef();
  const [fileNames, setFileNames] = useState([]);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateMentorBatches = (divisions) => {
    const mentor_batches = [];
    divisions.forEach(div => {
      (div.batches || []).forEach((batch) => {
        mentor_batches.push({
          division: div.name,
          batch,
          mentor: 'TBD',
          roll_range: [`${batch}-01`, `${batch}-30`]
        });
      });
    });
    return mentor_batches;
  };

  const parseTextFile = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const subjects = [];
    const faculty = [];
    const rooms = [];
    const divisions = [];
    let university = null;
    let department = null;

    for (const line of lines) {
      if (line.startsWith('University:')) university = line.split(':')[1].trim();
      else if (line.startsWith('Department:')) department = line.split(':')[1].trim();
      else if (line.startsWith('Division:')) {
        const divisionName = line.split(':')[1].trim();
        divisions.push({ name: divisionName, batches: [] });
      }
      else if (line.startsWith('Batch:')) {
        const batches = line.split(':')[1].split(',').map(b => b.trim());
        if (divisions.length > 0) divisions[divisions.length - 1].batches.push(...batches);
      }
      else if (line.startsWith('Room:')) {
        const parts = line.replace('Room:', '').split(',').map(p => p.trim());
        if (parts.length >= 3) {
          const [name, label, type, capacityStr] = parts;
          rooms.push({
            name,
            label: label || name,
            type: type || 'Theory',
            capacity: parseInt(capacityStr) || 30
          });
        }
      }
      else if (line.startsWith('Faculty:')) {
        const parts = line.replace('Faculty:', '').split(',').map(p => p.trim());
        const [abbr, name, ...rest] = parts;
        const availability = rest.slice(0, 5).map(v => parseInt(v)).filter(v => !isNaN(v));
        const max_per_day = parseInt(rest[5]) || 5;
        const max_per_week = parseInt(rest[6]) || 25;
        faculty.push({ abbr, name, availability, max_per_day, max_per_week });
      }
      else if (line.includes(',')) {
        const [code, name, facultyStr, type = 'Theory'] = line.split(',').map(p => p.trim());
        subjects.push({
          code,
          name,
          faculty: facultyStr ? facultyStr.split(';').map(f => f.trim()) : [],
          type
        });
      }
    }

    return {
      university,
      department,
      academic_year: null,
      term: null,
      effective_from: null,
      effective_to: null,
      divisions,
      faculty,
      rooms,
      subjects,
      mentor_batches: generateMentorBatches(divisions)
    };
  };

  const mergeJsonData = (filesData) => {
    const merged = {
      university: null,
      department: null,
      academic_year: null,
      term: null,
      effective_from: null,
      effective_to: null,
      divisions: [],
      faculty: [],
      rooms: [],
      subjects: [],
      mentor_batches: []
    };

    filesData.forEach(data => {
      if (data.university && !merged.university) merged.university = data.university;
      if (data.department && !merged.department) merged.department = data.department;
      if (data.academic_year && !merged.academic_year) merged.academic_year = data.academic_year;
      if (data.term && !merged.term) merged.term = data.term;
      if (data.effective_from && !merged.effective_from) merged.effective_from = data.effective_from;
      if (data.effective_to && !merged.effective_to) merged.effective_to = data.effective_to;
      if (data.divisions) merged.divisions.push(...data.divisions);
      if (data.faculty) merged.faculty.push(...data.faculty);
      if (data.rooms) merged.rooms.push(...data.rooms);
      if (data.subjects) merged.subjects.push(...data.subjects);
      if (data.mentor_batches) merged.mentor_batches.push(...data.mentor_batches);
    });

    merged.faculty = Array.from(new Map(merged.faculty.map(item => [item.abbr, item])).values());
    merged.rooms = Array.from(new Map(merged.rooms.map(item => [item.name, item])).values());
    merged.subjects = Array.from(new Map(merged.subjects.map(item => [item.code, item])).values());
    merged.mentor_batches = Array.from(new Map(merged.mentor_batches.map(item => [`${item.division}-${item.batch}`, item])).values());

    if (merged.mentor_batches.length === 0 && merged.divisions.length > 0) {
      merged.mentor_batches = generateMentorBatches(merged.divisions);
    }

    return merged;
  };

  const handleFiles = async (files) => {
    setFileNames(Array.from(files).map(f => f.name));
    setLoading(true);
    try {
      const parsedData = [];
      for (const file of files) {
        const fileType = file.type;
        const fileNameLower = file.name.toLowerCase();
        if (fileType === 'application/json' || fileNameLower.endsWith('.json')) {
          const text = await file.text();
          const parsed = JSON.parse(text);
          if (!parsed.subjects || !parsed.faculty || !parsed.rooms) {
            toast.error(`❌ Invalid JSON structure in ${file.name}. Must include subjects, faculty, and rooms.`);
            continue;
          }
          parsedData.push(parsed);
        }
        else if (fileType === 'text/plain' || fileNameLower.endsWith('.txt')) {
          const text = await file.text();
          const parsed = parseTextFile(text);
          parsedData.push(parsed);
        }
        else if (fileType === 'application/pdf' || fileNameLower.endsWith('.pdf')) {
          const result = await Tesseract.recognize(file, 'eng', {
            logger: m => console.log(m)
          });
          const text = result.data.text;
          const parsed = parseTextFile(text);
          parsedData.push(parsed);
          toast.info(`⚠ OCR Confidence: ${result.data.confidence.toFixed(2)}% for ${file.name}`);
        }
        else if (fileType.startsWith('image/')) {
          const result = await Tesseract.recognize(file, 'eng', {
            logger: m => console.log(m)
          });
          const text = result.data.text;
          const parsed = parseTextFile(text);
          parsedData.push(parsed);
          toast.info(`⚠ OCR Confidence: ${result.data.confidence.toFixed(2)}% for ${file.name}`);
        }
        else {
          toast.error(`❌ Unsupported file type: ${file.name}.`);
          continue;
        }
      }

      if (parsedData.length === 0) {
        toast.error('❌ No valid files provided.');
        return;
      }

      const merged = mergeJsonData(parsedData);
      setPreview(merged);
      toast.success(`✅ ${parsedData.length} file(s) parsed and merged successfully`);
    } catch (err) {
      console.error(err);
      toast.error('❌ File processing failed');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) handleFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFiles(files);
  };

  const handleDrag = (e, isOver) => {
    e.preventDefault();
    setDragOver(isOver);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        onDrop={handleDrop}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        style={{
          border: dragOver ? '3px dashed #007bff' : '2px dashed #ccc',
          padding: '16px',
          borderRadius: '10px',
          background: dragOver ? '#010a11ff' : '#140101ff',
          textAlign: 'center',
          marginBottom: '15px'
        }}
      >
        <label htmlFor="file-upload" style={{ fontWeight: 'bold' }}>
          📂 Drag & Drop or Click to Upload Files (JSON, TXT, PDF, JPG, PNG)
        </label>
        <input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json,.txt,.pdf,.jpg,.jpeg,.png"
          multiple
          style={{ display: 'block', margin: '10px auto' }}
        />
        {fileNames.length > 0 && (
          <p style={{ marginTop: '10px', color: '#ccc' }}>
            📎 <strong>{fileNames.join(', ')}</strong> selected
          </p>
        )}
        {loading && <p style={{ color: '#ccc', textAlign: 'center' }}>⏳ Parsing files, please wait...</p>}
      </div>
      {preview && (
        <div style={{ textAlign: 'left', marginTop: '15px' }}>
          <button
            onClick={() => {
              onParsed(preview);
              toast.success('✅ Data applied to form');
              setPreview(null);
              setFileNames([]);
            }}
            style={{ marginRight: '10px' }}
          >
            ✅ Apply Parsed Data
          </button>
          <button onClick={() => {
            setPreview(null);
            setFileNames([]);
          }}>
            ❌ Cancel
          </button>
          <pre
            style={{
              maxHeight: '300px',
              overflow: 'auto',
              background: '#0e0101ff',
              padding: '10px',
              border: '1px solid #ddd',
              marginTop: '10px'
            }}
          >
            {JSON.stringify(preview, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
