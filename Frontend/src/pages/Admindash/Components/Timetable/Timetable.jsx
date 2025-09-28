import React, { useState } from 'react';
import FileUpload from './FileUpload';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import styles from './Timetable.module.css';

const initialSubject = {
  code: '',
  name: '',
  faculty: [''],
  type: 'Theory',
  room_type: 'Theory',
  duration: 50,
  min_per_week: 3,
  max_per_week: 5,
  required_room: '',
  batches: [],
  is_mentor: false,
};

const initialRoom = {
  name: '',
  type: 'Theory',
  capacity: 30,
};

const initialFaculty = {
  abbr: '',
  name: '',
  max_per_day: 5,
  max_per_week: 25,
  availability: [0, 1, 2, 3, 4],
};

const initialFormData = {
  university: '',
  department: '',
  academic_year: '',
  term: '',
  effective_from: '',
  effective_to: '',
  divisions: [{ name: '', batches: [''] }],
  faculty: [{ ...initialFaculty }],
  rooms: [{ ...initialRoom }],
  subjects: [{ ...initialSubject }],
};

const TIME_SLOTS = [
  "08:50-09:40",
  "09:40-10:30",
  "10:30-11:20",
  "11:20-12:10",
  "12:10-01:00",
  "01:00-01:40",
  "01:40-02:30",
  "02:30-03:20",
  "03:20-04:10",
];

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function TimetableForm() {
  // State management
  const [formData, setFormData] = useState(initialFormData);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [mentorBatches, setMentorBatches] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState(null);

  // Logo upload handler
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Basic form handlers
  const handleChange = (field, value) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateFormDataArray = (key, index, field, value) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    const updated = [...formData[key]];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, [key]: updated });
  };

  // Division and batch handlers
  const handleDivisionChange = (index, value) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    const updated = [...formData.divisions];
    updated[index] = { ...updated[index], name: value };
    setFormData({ ...formData, divisions: updated });
  };

  const handleBatchChange = (divIndex, batchIndex, value) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    const updated = [...formData.divisions];
    updated[divIndex] = {
      ...updated[divIndex],
      batches: updated[divIndex].batches.map((batch, i) =>
        i === batchIndex ? value : batch
      ),
    };
    setFormData({ ...formData, divisions: updated });
  };

  // Array addition handlers
  const addToArray = (key, template) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    setFormData(prev => ({
      ...prev,
      [key]: [...prev[key], { ...template }],
    }));
  };

  const addDivision = () => {
    addToArray('divisions', { name: '', batches: [''] });
  };

  const addBatchToDivision = (divIndex) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    const updated = [...formData.divisions];
    updated[divIndex] = {
      ...updated[divIndex],
      batches: [...updated[divIndex].batches, ''],
    };
    setFormData({ ...formData, divisions: updated });
  };

  // Subject handlers
  const handleSubjectChange = (index, field, value) => {
    if (field === 'faculty' && typeof value === 'object') {
      updateFormDataArray('subjects', index, field, value);
    } else {
      updateFormDataArray('subjects', index, field, value);
    }
  };

  const addSubject = () => {
    addToArray('subjects', initialSubject);
  };

  const addBatchToSubject = (subjectIndex) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    const updated = [...formData.subjects];
    updated[subjectIndex] = {
      ...updated[subjectIndex],
      batches: [
        ...(updated[subjectIndex].batches || []),
        { name: '', faculty: '', room: '' },
      ],
    };
    setFormData({ ...formData, subjects: updated });
  };

  const handleLabBatchChange = (subjectIndex, batchIndex, field, value) => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    const updated = [...formData.subjects];
    updated[subjectIndex] = {
      ...updated[subjectIndex],
      batches: updated[subjectIndex].batches.map((batch, i) =>
        i === batchIndex ? { ...batch, [field]: value } : batch
      ),
    };
    setFormData({ ...formData, subjects: updated });
  };

  // Room and faculty handlers
  const handleRoomChange = (index, field, value) => {
    updateFormDataArray('rooms', index, field,
      field === 'capacity' ? parseInt(value) || 0 : value
    );
  };

  const handleFacultyChange = (index, field, value) => {
    const val = field === 'availability'
      ? value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
      : value;
    updateFormDataArray('faculty', index, field, val);
  };

  const addRoom = () => {
    addToArray('rooms', initialRoom);
  };

  const addFaculty = () => {
    addToArray('faculty', initialFaculty);
  };

  // Undo and reset handlers
  const undoLastChange = () => {
    if (undoStack.length > 0) {
      const previous = undoStack[undoStack.length - 1];
      setUndoStack(undoStack.slice(0, -1));
      setFormData(previous);
    }
  };

  const resetForm = () => {
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    setFormData(initialFormData);
    setMentorBatches([]);
    setGeneratedTimetable(null);
    setSelectedDivision(null);
  };

  // Validation
  const validateForm = () => {
    const { university, department, divisions, subjects, rooms, faculty } = formData;
    if (!university || !department) return false;
    if (!divisions.length || !subjects.length || !rooms.length || !faculty.length) return false;
    return true;
  };

  // Mentor batch handlers
  const handleMentorBatchChange = (index, field, value) => {
    const updated = [...mentorBatches];
    if (field === 'roll_range') {
      if (!updated[index].roll_range) updated[index].roll_range = ['', ''];
      updated[index].roll_range[value.index] = value.val;
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setMentorBatches(updated);
  };

  const addMentorBatch = () => {
    setMentorBatches(prev => [...prev, {
      division: '',
      batch: '',
      mentor: '',
      roll_range: ['', ''],
    }]);
  };

  const removeMentorBatch = (index) => {
    setMentorBatches(prev => prev.filter((_, i) => i !== index));
  };

  // Utility functions
  const generateMentorBatches = (divisions) => {
    const mentor_batches = [];
    divisions.forEach(div => {
      (div.batches || []).forEach((batch) => {
        mentor_batches.push({
          division: div.name,
          batch,
          mentor: 'TBD',
          roll_range: [`${batch}-01`, `${batch}-30`],
        });
      });
    });
    return mentor_batches;
  };

  const findBatchGrid = (batch) => {
    if (!generatedTimetable) return null;
    for (const divData of Object.values(generatedTimetable)) {
      if (divData.batches && divData.batches[batch]) {
        const batchSchedule = divData.batches[batch];
        const grid = [];
        DAY_NAMES.forEach(dayName => {
          if (batchSchedule[dayName]) {
            const daySlots = batchSchedule[dayName];
            if (Array.isArray(daySlots)) {
              const dayRow = daySlots.map((slot, index) => {
                if (index === 5 && (slot === "LUNCH BREAK" || slot === "01:00-01:40")) {
                  return "LUNCH\nBREAK";
                }
                if (slot && slot !== "-") {
                  const parts = slot.split('\n');
                  if (parts.length >= 2) {
                    return `${parts[0]}\n${parts[1]}`;
                  }
                  return slot;
                }
                return '';
              });
              grid.push(dayRow);
            }
          }
        });
        return grid.length > 0 ? grid : null;
      }
    }
    return null;
  };

  const getDivisionBatchGrids = (divisionName) => {
    if (!generatedTimetable || !generatedTimetable[divisionName]) return {};
    const division = formData.divisions.find(d => d.name === divisionName);
    if (!division) return {};
    const batchGrids = {};
    division.batches.forEach(batch => {
      const grid = findBatchGrid(batch);
      if (grid) {
        batchGrids[batch] = grid;
      }
    });
    return batchGrids;
  };

  // PDF Export functions
  const exportDivisionToPDF = (divisionName) => {
    const doc = new jsPDF('l');
    const division = formData.divisions.find(d => d.name === divisionName);
    const batches = division ? division.batches : [];
    if (batches.length === 0) {
      alert('No batches found for this division');
      return;
    }
    const batchGrids = getDivisionBatchGrids(divisionName);
    if (Object.keys(batchGrids).length === 0) {
      alert('No timetable data found for this division');
      return;
    }
    if (logoFile) {
      doc.addImage(logoFile, 'PNG', 20, 5, 30, 15);
      doc.addImage(logoFile, 'PNG', 240, 5, 30, 15);
    }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(formData.university || 'PIMPRI CHINCHWAD EDUCATION TRUST\'S', 148, 15, { align: 'center' });
    doc.text((formData.department || 'Department Name') + ', ' + (formData.university || 'College Name'), 148, 25, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Academic Year: ${formData.academic_year || '2025-26'}`, 20, 35);
    doc.text(`Term: ${formData.term || '1'}`, 20, 42);
    doc.text('Class Time Table', 148, 42, { align: 'center' });
    doc.text(`Record No.: ${divisionName}DIV${new Date().getFullYear()}`, 240, 35);
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 240, 42);
    doc.setFontSize(12);
    doc.text(`Department: ${formData.department || 'Computer Engineering'}`, 20, 55);
    doc.text(`Class: ${formData.academic_year?.split('-')[0] || 'TE'} ${formData.department?.split(' ')[0] || 'Computer'}`, 120, 55);
    doc.text(`Div: ${divisionName}`, 200, 55);
    doc.text(`w.e.f - ${formData.effective_from || new Date().toLocaleDateString('en-GB')}`, 240, 55);
    let currentY = 65;
    const tableHeaders = ['Day\\Time', ...TIME_SLOTS];
    const tableBody = [];
    DAY_NAMES.forEach((dayName, dayIndex) => {
      const dayRow = [dayName];
      TIME_SLOTS.forEach((timeSlot, slotIndex) => {
        if (slotIndex === 5) {
          dayRow.push('LUNCH\nBREAK');
          return;
        }
        const slotActivities = [];
        batches.forEach(batch => {
          const grid = batchGrids[batch];
          if (grid && grid[dayIndex] && grid[dayIndex][slotIndex]) {
            const activity = grid[dayIndex][slotIndex];
            if (activity && activity !== '' && activity !== 'LUNCH\nBREAK') {
              const parts = activity.split('\n');
              if (parts.length >= 2) {
                slotActivities.push(`${parts[0]}(${parts[1]})-${batch}`);
              } else {
                slotActivities.push(`${activity}-${batch}`);
              }
            }
          }
        });
        dayRow.push(slotActivities.length > 0 ? slotActivities.join('\n') : '');
      });
      tableBody.push(dayRow);
    });
    autoTable(doc, {
      startY: currentY,
      head: [tableHeaders],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: [220, 53, 69],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
        fontSize: 9,
      },
      bodyStyles: {
        fontSize: 8,
        halign: 'center',
        valign: 'middle',
        cellPadding: 2,
        minCellHeight: 20,
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        cellPadding: 2,
      },
      columnStyles: {
        0: {
          fontStyle: 'bold',
          fillColor: [220, 53, 69],
          textColor: [255, 255, 255],
          halign: 'center',
        },
        6: {
          fillColor: [255, 193, 7],
          fontStyle: 'bold',
        },
      },
      didDrawCell: function(data) {
        if (data.column.index === 6) {
          doc.setFillColor(255, 193, 7);
        }
      },
    });
    currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : currentY + 100;
    const facultyList = formData.faculty || [];
    if (facultyList.length > 0) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Faculty Information:', 20, currentY);
      currentY += 8;
      const facultyHeaders = ['Abbr.', 'Name of Faculty', 'Subject', 'Mentor Batch', 'Roll Range'];
      const facultyBody = [];
      facultyList.forEach((fac) => {
        const mentorInfo = mentorBatches.find(mb => mb.mentor === fac.abbr);
        const facultySubjects = formData.subjects.filter(s =>
          s.faculty && s.faculty.includes(fac.abbr)
        );
        const subjectName = facultySubjects.length > 0 ?
          `${facultySubjects[0].code} - ${facultySubjects[0].name}` : '';
        facultyBody.push([
          fac.abbr || '',
          fac.name || '',
          subjectName || '',
          mentorInfo ? `${mentorInfo.division}-${mentorInfo.batch}` : '',
          mentorInfo ? mentorInfo.roll_range?.join(' TO ') : '',
        ]);
      });
      autoTable(doc, {
        startY: currentY,
        head: [facultyHeaders],
        body: facultyBody,
        theme: 'grid',
        headStyles: {
          fillColor: [220, 53, 69],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8,
          halign: 'center',
        },
        bodyStyles: {
          fontSize: 7,
          halign: 'center',
          valign: 'middle',
          cellPadding: 2,
        },
        styles: {
          lineColor: [0, 0, 0],
          lineWidth: 0.5,
        },
      });
      currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : currentY + 50;
    }
    currentY += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('_____________________', 30, currentY);
    doc.text('Class Teacher', 30, currentY + 8);
    doc.text('_____________________', 120, currentY);
    doc.text('Department Academic Coordinator', 120, currentY + 8);
    doc.text('_____________________', 210, currentY);
    doc.text('Head of Department', 210, currentY + 8);
    currentY += 20;
    doc.setFontSize(8);
    doc.text(`Rev.: 00    Date: ${new Date().toLocaleDateString('en-GB')}`, 20, currentY);
    doc.text('Page 1 of 1', 250, currentY);
    doc.save(`${divisionName}_division_combined_timetable.pdf`);
  };

  const exportBatchToPDF = (batch) => {
    const doc = new jsPDF('l');
    if (logoFile) {
      doc.addImage(logoFile, 'PNG', 120, 5, 50, 20);
    }
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(formData.university || 'University Name', 148, 30, { align: 'center' });
    doc.text(formData.department || 'Department Name', 148, 40, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.text(`Batch: ${batch} - Academic Year: ${formData.academic_year || 'N/A'}`, 14, 50);
    const grid = findBatchGrid(batch);
    if (grid && Array.isArray(grid) && grid.length > 0) {
      autoTable(doc, {
        startY: 60,
        head: [['Day/Time', ...TIME_SLOTS]],
        body: grid.map((row, r) => [DAY_NAMES[r] || `Day ${r + 1}`, ...row.map(cell => cell || '')]),
        theme: 'grid',
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center',
          fontSize: 10,
        },
        bodyStyles: {
          fontSize: 9,
          halign: 'center',
          valign: 'middle',
          cellPadding: 3,
          minCellHeight: 25,
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        styles: {
          lineColor: [0, 0, 0],
          lineWidth: 0.5,
          cellPadding: 3,
        },
        columnStyles: {
          0: { fontStyle: 'bold', fillColor: [52, 152, 219], textColor: [255, 255, 255] },
        },
      });
    } else {
      doc.setFontSize(12);
      doc.text('No timetable data available for this batch.', 14, 60);
    }
    doc.save(`${batch}_timetable.pdf`);
  };

  const downloadPDF = () => {
    try {
      const doc = new jsPDF('l');
      let currentY = 16;
      if (logoFile) {
        doc.addImage(logoFile, 'PNG', 120, 5, 50, 20);
        currentY = 35;
      }
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Complete Timetable', 14, currentY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Academic Year: ${formData.academic_year || 'N/A'} | Department: ${formData.department || 'N/A'}`, 14, currentY + 8);
      currentY += 20;
      formData.divisions.forEach((division, divIndex) => {
        if (divIndex > 0) {
          doc.addPage('l');
          currentY = logoFile ? 35 : 16;
        }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`Division: ${division.name}`, 14, currentY);
        currentY += 10;
        division.batches.forEach((batch) => {
          const grid = findBatchGrid(batch);
          if (grid && Array.isArray(grid) && grid.length > 0) {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`Batch: ${batch}`, 14, currentY);
            currentY += 10;
            autoTable(doc, {
              head: [['Day/Time', ...TIME_SLOTS]],
              body: grid.map((row, r) => [DAY_NAMES[r] || `Day ${r + 1}`, ...row.map(cell => cell || '')]),
              startY: currentY,
              theme: 'grid',
              headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center',
                fontSize: 10,
              },
              bodyStyles: {
                fontSize: 9,
                halign: 'center',
                valign: 'middle',
                cellPadding: 3,
                minCellHeight: 25,
              },
              alternateRowStyles: { fillColor: [245, 245, 245] },
              styles: {
                lineColor: [0, 0, 0],
                lineWidth: 0.5,
                cellPadding: 3,
              },
              columnStyles: {
                0: { fontStyle: 'bold', fillColor: [52, 152, 219], textColor: [255, 255, 255] },
              },
              didDrawPage: (data) => {
                currentY = data.cursor.y + 15;
              },
            });
            if (currentY > 150) {
              doc.addPage('l');
              currentY = 20;
            }
          }
        });
      });
      doc.save('complete_timetable.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('❌ Error generating PDF. Please try again.');
    }
  };

  // Excel export functions
  const downloadExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      formData.divisions.forEach(division => {
        division.batches.forEach(batch => {
          const grid = findBatchGrid(batch);
          if (grid && Array.isArray(grid) && grid.length > 0) {
            const rows = grid.map((row, i) => {
              const day = DAY_NAMES[i] || `Day ${i + 1}`;
              const rowData = { 'Day': day };
              row.forEach((cell, idx) => {
                rowData[TIME_SLOTS[idx] || `Time ${idx + 1}`] = cell || '';
              });
              return rowData;
            });
            const ws = XLSX.utils.json_to_sheet(rows);
            XLSX.utils.book_append_sheet(wb, ws, `${division.name}_${batch}`);
          }
        });
      });
      XLSX.writeFile(wb, 'complete_timetable.xlsx');
    } catch (error) {
      console.error('Error generating Excel file:', error);
      alert('❌ Error generating Excel file. Please try again.');
    }
  };

  const exportDivisionToExcel = (divisionName) => {
    const wb = XLSX.utils.book_new();
    const division = formData.divisions.find(d => d.name === divisionName);
    const batches = division ? division.batches : [];
    batches.forEach(batch => {
      const grid = findBatchGrid(batch);
      if (grid && Array.isArray(grid) && grid.length > 0) {
        const rows = grid.map((row, i) => {
          const day = DAY_NAMES[i] || `Day ${i + 1}`;
          const rowData = { 'Day': day };
          row.forEach((cell, idx) => {
            rowData[TIME_SLOTS[idx] || `Time ${idx + 1}`] = cell || '';
          });
          return rowData;
        });
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, batch);
      }
    });
    XLSX.writeFile(wb, `${divisionName}_timetable.xlsx`);
  };

  // Form preview
  const previewFormData = () => {
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) return;
    const jsonPreview = JSON.stringify(formData, null, 2)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const html = `
      <html>
        <head>
          <title>Form Preview</title>
          <style>
            body {
              background-color: #0d0d0d;
              color: #eaeaea;
              padding: 20px;
              font-family: monospace;
              line-height: 1.6;
            }
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              background: #1a1a1a;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #333;
            }
            h2 {
              color: #6c5ce7;
              margin-bottom: 15px;
            }
          </style>
        </head>
        <body>
          <h2>🧾 Timetable Form Data Preview</h2>
          <pre>${jsonPreview}</pre>
        </body>
      </html>`;
    previewWindow.document.write(html);
    previewWindow.document.close();
  };

  // Data import handler
  const handleParsedData = (parsed) => {
    if (!parsed || typeof parsed !== 'object') {
      alert('❌ Invalid parsed data.');
      return;
    }
    const safeParsed = {
      ...parsed,
      subjects: (parsed.subjects || []).map(s => ({
        ...initialSubject,
        ...s,
        faculty: Array.isArray(s.faculty) ? s.faculty : [s.faculty || ''],
        batches: Array.isArray(s.batches) ? s.batches : [],
      })),
      faculty: (parsed.faculty || []).map(f => ({
        ...initialFaculty,
        ...f,
        availability: Array.isArray(f.availability) ? f.availability : [0, 1, 2, 3, 4],
      })),
      rooms: (parsed.rooms || []).map(r => ({ ...initialRoom, ...r })),
      divisions: (parsed.divisions || []).map(d => ({
        name: d.name || '',
        batches: Array.isArray(d.batches) ? d.batches : [''],
      })),
      academic_year: parsed.academic_year || '',
      term: parsed.term || '',
      effective_from: parsed.effective_from || '',
      effective_to: parsed.effective_to || '',
    };
    setUndoStack(prev => [...prev, JSON.parse(JSON.stringify(formData))]);
    setFormData(prev => ({
      ...prev,
      university: parsed.university || prev.university,
      department: parsed.department || prev.department,
      academic_year: parsed.academic_year || prev.academic_year,
      term: parsed.term || prev.term,
      effective_from: parsed.effective_from || prev.effective_from,
      effective_to: parsed.effective_to || prev.effective_to,
      divisions: [...(prev.divisions || []), ...(safeParsed.divisions || [])],
      subjects: [...(prev.subjects || []), ...(safeParsed.subjects || [])],
      faculty: [...(prev.faculty || []), ...(safeParsed.faculty || [])],
      rooms: [...(prev.rooms || []), ...(safeParsed.rooms || [])],
    }));
    if (parsed.mentor_batches && Array.isArray(parsed.mentor_batches)) {
      setMentorBatches(prev => [...prev, ...parsed.mentor_batches]);
    }
    alert('✅ Data imported successfully!');
  };

  // Main form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) {
      alert('❌ Please fill in all required fields.');
      return;
    }
    setLoading(true);
    let finalMentorBatches = mentorBatches.length > 0
      ? mentorBatches
      : generateMentorBatches(formData.divisions);
    const payload = {
      ...formData,
      mentor_batches: finalMentorBatches,
    };
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setGeneratedTimetable(data.timetable.divisions || data.timetable || {});
        setMentorBatches(finalMentorBatches);
        if (formData.divisions.length > 0) {
          setSelectedDivision(formData.divisions[0].name);
        }
      } else {
        alert('❌ Error generating timetable: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error generating timetable:', error);
      alert('❌ Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🧠 University Timetable Generator</h2>
      {/* Utility Buttons Section */}
      <div className={styles.section}>
        <div className={styles.utilityButtons}>
          <button onClick={previewFormData} className={styles.button} type="button">
            👁️ Preview Form
          </button>
          <button
            onClick={undoLastChange}
            className={styles.button}
            type="button"
            disabled={undoStack.length === 0}
          >
            ↶ Undo
          </button>
          <button onClick={resetForm} className={styles.button} type="button">
            🔄 Reset Form
          </button>
        </div>
      </div>
      {/* Logo Upload Section */}
      <div className={styles.section}>
        <label className={styles.fileInputLabel}>
          📤 Upload Logo:
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className={styles.fileInput}
          />
          {logoFile ? 'Logo uploaded ✓' : 'Click to upload logo'}
        </label>
      </div>
      {/* File Upload Section */}
      <div className={styles.section}>
        <FileUpload onParsed={handleParsedData} />
      </div>
      {/* Institution Information Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>🏫 Institution Information</h3>
        <div className={styles.grid}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder=" "
              value={formData.university}
              onChange={e => handleChange('university', e.target.value)}
            />
            <label>University Name</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder=" "
              value={formData.department}
              onChange={e => handleChange('department', e.target.value)}
            />
            <label>Department Name</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder=" "
              value={formData.academic_year}
              onChange={e => handleChange('academic_year', e.target.value)}
            />
            <label>Academic Year (e.g., 2025-26)</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder=" "
              value={formData.term}
              onChange={e => handleChange('term', e.target.value)}
            />
            <label>Term</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="date"
              placeholder=" "
              value={formData.effective_from}
              onChange={e => handleChange('effective_from', e.target.value)}
            />
            <label>Effective From</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="date"
              placeholder=" "
              value={formData.effective_to}
              onChange={e => handleChange('effective_to', e.target.value)}
            />
            <label>Effective To</label>
          </div>
        </div>
      </div>
      {/* Divisions & Batches Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>🏫 Divisions & Batches</h3>
        {formData.divisions.map((division, divIndex) => (
          <div key={divIndex} className={styles.card}>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                placeholder=" "
                value={division.name}
                onChange={e => handleDivisionChange(divIndex, e.target.value)}
              />
              <label>Division Name (e.g., A, B, C)</label>
            </div>
            <div className={styles.batchContainer}>
              <strong className={styles.batchLabel}>Batches:</strong>
              {division.batches.map((batch, batchIndex) => (
                <div key={batchIndex} className={styles.inputContainer}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    value={batch}
                    onChange={e => handleBatchChange(divIndex, batchIndex, e.target.value)}
                  />
                  <label>{`Batch ${batchIndex + 1}`}</label>
                </div>
              ))}
              <button
                className={styles.addButton}
                type="button"
                onClick={() => addBatchToDivision(divIndex)}
              >
                ➕ Add Batch
              </button>
            </div>
          </div>
        ))}
        <button className={styles.button} type="button" onClick={addDivision}>
          ➕ Add Division
        </button>
      </div>
      {/* Faculty Management Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>👩‍🏫 Faculty Management</h3>
        {formData.faculty.map((faculty, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.grid}>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={faculty.abbr}
                  onChange={e => handleFacultyChange(index, 'abbr', e.target.value)}
                />
                <label>Faculty Abbreviation</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={faculty.name}
                  onChange={e => handleFacultyChange(index, 'name', e.target.value)}
                />
                <label>Full Name</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=" "
                  value={faculty.max_per_day}
                  onChange={e => handleFacultyChange(index, 'max_per_day', parseInt(e.target.value) || 0)}
                />
                <label>Max per day</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=" "
                  value={faculty.max_per_week}
                  onChange={e => handleFacultyChange(index, 'max_per_week', parseInt(e.target.value) || 0)}
                />
                <label>Max per week</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={faculty.availability.join(',')}
                  onChange={e => handleFacultyChange(index, 'availability', e.target.value)}
                />
                <label>Availability (0-4, comma separated)</label>
              </div>
            </div>
          </div>
        ))}
        <button className={styles.button} type="button" onClick={addFaculty}>
          ➕ Add Faculty
        </button>
      </div>
      {/* Subject Configuration Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📘 Subject Configuration</h3>
        {formData.subjects.map((subject, index) => (
          <div key={index} className={styles.subjectCard}>
            <div className={styles.grid}>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={subject.code}
                  onChange={e => handleSubjectChange(index, 'code', e.target.value)}
                />
                <label>Subject Code</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={subject.name}
                  onChange={e => handleSubjectChange(index, 'name', e.target.value)}
                />
                <label>Subject Name</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={(subject.faculty || []).join(';')}
                  onChange={e => handleSubjectChange(index, 'faculty', e.target.value.split(';'))}
                />
                <label>Faculty (semicolon separated)</label>
              </div>
              <div className={styles.inputContainer}>
                <select
                  className={styles.input}
                  value={subject.type}
                  onChange={e => handleSubjectChange(index, 'type', e.target.value)}
                >
                  <option value="Theory">Theory</option>
                  <option value="Lab">Lab</option>
                </select>
                <label>Subject Type</label>
              </div>
              <div className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={subject.is_mentor || false}
                  onChange={e => handleSubjectChange(index, 'is_mentor', e.target.checked)}
                  id={`mentor-${index}`}
                />
                <label htmlFor={`mentor-${index}`}>Mentor Subject</label>
              </div>
              <div className={styles.inputContainer}>
                <select
                  className={styles.input}
                  value={subject.room_type}
                  onChange={e => handleSubjectChange(index, 'room_type', e.target.value)}
                >
                  <option value="Theory">Theory Room</option>
                  <option value="Lab">Lab Room</option>
                </select>
                <label>Room Type</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=" "
                  value={subject.duration}
                  onChange={e => handleSubjectChange(index, 'duration', parseInt(e.target.value) || 50)}
                />
                <label>Duration (minutes)</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=" "
                  value={subject.min_per_week}
                  onChange={e => handleSubjectChange(index, 'min_per_week', parseInt(e.target.value) || 1)}
                />
                <label>Min per week</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=" "
                  value={subject.max_per_week}
                  onChange={e => handleSubjectChange(index, 'max_per_week', parseInt(e.target.value) || 5)}
                />
                <label>Max per week</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={subject.required_room}
                  onChange={e => handleSubjectChange(index, 'required_room', e.target.value)}
                />
                <label>Required Room (optional)</label>
              </div>
            </div>
            {subject.type === 'Lab' && (
              <div className={styles.batchSection}>
                <h4 className={styles.batchSectionTitle}>Lab Batches</h4>
                {(subject.batches || []).map((batch, batchIndex) => (
                  <div key={batchIndex} className={styles.labBatchGrid}>
                    <div className={styles.inputContainer}>
                      <input
                        className={styles.input}
                        placeholder=" "
                        value={batch.name || ''}
                        onChange={e => handleLabBatchChange(index, batchIndex, 'name', e.target.value)}
                      />
                      <label>Batch Name</label>
                    </div>
                    <div className={styles.inputContainer}>
                      <input
                        className={styles.input}
                        placeholder=" "
                        value={batch.faculty || ''}
                        onChange={e => handleLabBatchChange(index, batchIndex, 'faculty', e.target.value)}
                      />
                      <label>Faculty for this batch</label>
                    </div>
                    <div className={styles.inputContainer}>
                      <input
                        className={styles.input}
                        placeholder=" "
                        value={batch.room || ''}
                        onChange={e => handleLabBatchChange(index, batchIndex, 'room', e.target.value)}
                      />
                      <label>Room for this batch</label>
                    </div>
                  </div>
                ))}
                <button
                  className={styles.addButton}
                  type="button"
                  onClick={() => addBatchToSubject(index)}
                >
                  ➕ Add Lab Batch
                </button>
              </div>
            )}
          </div>
        ))}
        <button className={styles.button} type="button" onClick={addSubject}>
          ➕ Add Subject
        </button>
      </div>
      {/* Room Management Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>🏢 Room Management</h3>
        {formData.rooms.map((room, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.roomGrid}>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={room.name}
                  onChange={e => handleRoomChange(index, 'name', e.target.value)}
                />
                <label>Room Name/Number</label>
              </div>
              <div className={styles.inputContainer}>
                <select
                  className={styles.input}
                  value={room.type}
                  onChange={e => handleRoomChange(index, 'type', e.target.value)}
                >
                  <option value="Theory">Theory Room</option>
                  <option value="Lab">Lab Room</option>
                </select>
                <label>Room Type</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=" "
                  value={room.capacity}
                  onChange={e => handleRoomChange(index, 'capacity', e.target.value)}
                />
                <label>Capacity</label>
              </div>
            </div>
          </div>
        ))}
        <button className={styles.button} type="button" onClick={addRoom}>
          ➕ Add Room
        </button>
      </div>
      {/* Mentor Batches Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>🧑‍🏫 Mentor Batches</h3>
        {mentorBatches.map((batch, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.mentorGrid}>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={batch.division}
                  onChange={e => handleMentorBatchChange(index, 'division', e.target.value)}
                />
                <label>Division</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={batch.batch}
                  onChange={e => handleMentorBatchChange(index, 'batch', e.target.value)}
                />
                <label>Batch</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={batch.mentor}
                  onChange={e => handleMentorBatchChange(index, 'mentor', e.target.value)}
                />
                <label>Mentor</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={batch.roll_range?.[0] || ''}
                  onChange={e => handleMentorBatchChange(index, 'roll_range', { index: 0, val: e.target.value })}
                />
                <label>Roll From</label>
              </div>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  placeholder=" "
                  value={batch.roll_range?.[1] || ''}
                  onChange={e => handleMentorBatchChange(index, 'roll_range', { index: 1, val: e.target.value })}
                />
                <label>Roll To</label>
              </div>
            </div>
            <button
              className={`${styles.button} ${styles.removeButton}`}
              type="button"
              onClick={() => removeMentorBatch(index)}
            >
              ❌ Remove
            </button>
          </div>
        ))}
        <button className={styles.button} type="button" onClick={addMentorBatch}>
          ➕ Add Mentor Batch
        </button>
      </div>
      {/* Submit Button */}
      <div className={styles.submitSection}>
        <button
          className={`${styles.button} ${styles.submitButton}`}
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span> Generating...
            </>
          ) : (
            <>
              🚀 Generate Timetable
            </>
          )}
        </button>
      </div>
      {/* Generated Timetables Section */}
      {generatedTimetable && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>✅ Generated Timetables</h3>
          <div className={styles.downloadSection}>
            <h4 className={styles.downloadTitle}>📄 Complete Timetable Downloads</h4>
            <div className={styles.downloadButtons}>
              <button className={styles.downloadButton} onClick={downloadPDF} type="button">
                📄 Download Complete PDF
              </button>
              <button className={styles.downloadButton} onClick={downloadExcel} type="button">
                📊 Download Complete Excel
              </button>
            </div>
          </div>
          {/* Division Tabs */}
          <div className={styles.divisionTabs}>
            {formData.divisions.map((div, i) => (
              <button
                key={i}
                className={`${styles.tabButton} ${selectedDivision === div.name ? styles.activeTab : ''}`}
                onClick={() => setSelectedDivision(div.name)}
              >
                {div.name} Division
              </button>
            ))}
          </div>
          {/* Division Content */}
          {selectedDivision && (
            <div className={styles.divisionContent}>
              <h4 className={styles.divisionTitle}>📚 {selectedDivision} Division</h4>
              <div className={styles.downloadButtons}>
                <button className={styles.downloadButton} onClick={() => exportDivisionToPDF(selectedDivision)}>
                  📄 Export Division PDF
                </button>
                <button className={styles.downloadButton} onClick={() => exportDivisionToExcel(selectedDivision)}>
                  📊 Export Division Excel
                </button>
              </div>
              {/* Batches Section */}
              <div className={styles.batchesSection}>
                <h5 className={styles.batchesTitle}>📘 Batches</h5>
                <div className={styles.batchesGrid}>
                  {formData.divisions
                    .find((div) => div.name === selectedDivision)
                    ?.batches.map((batch, j) => (
                      <div key={j} className={styles.batchCard}>
                        <p className={styles.batchName}>Batch: {batch}</p>
                        <button
                          className={styles.batchButton}
                          onClick={() => exportBatchToPDF(batch)}
                        >
                          📄 Export Batch PDF
                        </button>
                      </div>
                    ))}
                </div>
              </div>
              {/* Timetable Preview */}
              <div className={styles.timetablePreview}>
                <h5 className={styles.timetableTitle}>📅 Timetable Preview</h5>
                {Object.keys(generatedTimetable[selectedDivision]?.batches || {}).map((batch) => {
                  const batchData = generatedTimetable[selectedDivision].batches[batch];
                  if (!batchData) return null;
                  return (
                    <div key={batch} className={styles.batchTimetable}>
                      <h6 className={styles.batchTimetableTitle}>Batch: {batch}</h6>
                      <div className={styles.tableContainer}>
                        <table className={styles.timetableTable}>
                          <thead>
                            <tr className={styles.tableHeaderRow}>
                              <th className={styles.tableHeader}>Day/Time</th>
                              {TIME_SLOTS.map((timeSlot, i) => (
                                <th
                                  key={i}
                                  className={`${styles.tableHeader} ${timeSlot === '01:00-01:40' ? styles.lunchBreakHeader : ''}`}
                                >
                                  {timeSlot}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {DAY_NAMES.map((dayName, r) => {
                              const daySlots = batchData[dayName] || [];
                              return (
                                <tr
                                  key={r}
                                  className={`${styles.tableRow} ${r % 2 === 0 ? styles.evenRow : styles.oddRow}`}
                                >
                                  <td className={styles.tableCell}>{dayName}</td>
                                  {TIME_SLOTS.map((timeSlot, c) => {
                                    const cellContent = daySlots[c] || '-';
                                    const isLunchBreak = timeSlot === '01:00-01:40';
                                    const isEmpty = cellContent === '-' || cellContent === '';
                                    return (
                                      <td
                                        key={c}
                                        className={`${styles.tableCell} ${isLunchBreak ? styles.lunchBreakCell : ''} ${isEmpty ? styles.emptyCell : ''}`}
                                      >
                                        {cellContent === 'LUNCH\nBREAK' ? '🍽️ LUNCH BREAK' : cellContent}
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Mentor Batches Table */}
              <div className={styles.mentorBatchesSection}>
                <h5 className={styles.mentorBatchesTitle}>🧑‍🏫 Mentor Batches</h5>
                <div className={styles.mentorTableContainer}>
                  <table className={styles.mentorTable}>
                    <thead>
                      <tr className={styles.mentorTableHeaderRow}>
                        <th className={styles.mentorTableHeader}>Batch</th>
                        <th className={styles.mentorTableHeader}>Mentor</th>
                        <th className={styles.mentorTableHeader}>Roll Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mentorBatches
                        .filter((mb) => mb.division === selectedDivision)
                        .map((mb, i) => (
                          <tr
                            key={i}
                            className={`${styles.mentorTableRow} ${i % 2 === 0 ? styles.mentorEvenRow : styles.mentorOddRow}`}
                          >
                            <td className={styles.mentorTableCell}>{mb.batch}</td>
                            <td className={styles.mentorTableCell}>{mb.mentor}</td>
                            <td className={styles.mentorTableCell}>{mb.roll_range?.join(' - ') || 'N/A'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
