import React, { useState, useEffect } from 'react';

const TimetableDemo = () => {
  const [theme, setTheme] = useState('purple');
  const [currentSubject, setCurrentSubject] = useState(null);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [subjectFaculties, setSubjectFaculties] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState([
    "HCI", "DBMS", "SPOS", "CNS", "OOP", "TOC", "DBMS Lab", "SPOS Lab"
  ]);
  
  const [facultyNames] = useState([
    "Dr. Thompson", "Prof. Singh", "Dr. Chen", "Prof. Martinez", "Dr. Johnson",
    "Prof. Williams", "Dr. Patel", "Dr. Garcia", "Prof. Lee", "Dr. Kumar",
    "Prof. Wilson", "Ms. Rodriguez", "Dr. Brown", "Prof. Davis", "Dr. Miller",
    "Prof. Taylor", "Dr. Harris", "Prof. Martin", "Dr. Lewis", "Prof. Walker",
    "Dr. Hall", "Prof. Allen", "Dr. Young", "Prof. King", "Dr. Wright", "Prof. Scott"
  ]);

  const times = [
    "9:40 - 10:30",
    "10:30 - 11:20",
    "11:20 - 12:10", 
    "12:10 - 1:00"
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Initialize timetable data with unique IDs for drag and drop
  const [timetableData, setTimetableData] = useState({
    "9:40 - 10:30": [
      { id: "m1", subject: "HCI", isBreak: false },
      { id: "t1", subject: "DBMS", isBreak: false },
      { id: "w1", subject: "SPOS", isBreak: false },
      { id: "th1", subject: "CNS", isBreak: false },
      { id: "f1", subject: "HCI", isBreak: false }
    ],
    "10:30 - 11:20": [
      { id: "m2", subject: "OOP", isBreak: false },
      { id: "t2", subject: "HCI", isBreak: false },
      { id: "w2", subject: "DBMS Lab", isBreak: false },
      { id: "th2", subject: "CNS", isBreak: false },
      { id: "f2", subject: "TOC", isBreak: false }
    ],
    "11:20 - 12:10": [
      { id: "m3", subject: "Break", isBreak: true },
      { id: "t3", subject: "Break", isBreak: true },
      { id: "w3", subject: "Break", isBreak: true },
      { id: "th3", subject: "Break", isBreak: true },
      { id: "f3", subject: "Break", isBreak: true }
    ],
    "12:10 - 1:00": [
      { id: "m4", subject: "OOP", isBreak: false },
      { id: "t4", subject: "SPOS Lab", isBreak: false },
      { id: "w4", subject: "HCI", isBreak: false },
      { id: "th4", subject: "SPOS", isBreak: false },
      { id: "f4", subject: "TOC", isBreak: false }
    ]
  });

  const sampleRooms = [
    "Room 503", "Room 504", "Room 505", "Room 506", "Room 518",
    "Lab 525", "Room 526", "Room 512", "Cafeteria", "Lab 513", "Lab 625", "Lab 624"
  ];

  // Initialize faculties for each subject
  useEffect(() => {
    const faculties = {};
    times.forEach((time, timeIdx) => {
      days.forEach((day, dayIdx) => {
        const subject = timetableData[time][dayIdx].subject;
        if (subject !== 'Break') {
          const key = `${time}-${dayIdx}`;
          faculties[key] = facultyNames[Math.floor(Math.random() * facultyNames.length)];
        }
      });
    });
    setSubjectFaculties(faculties);
  }, []);

  const generateFaculty = (time, dayIdx) => {
    const key = `${time}-${dayIdx}`;
    return subjectFaculties[key] || facultyNames[Math.floor(Math.random() * facultyNames.length)];
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const showSubjectDetails = (subject, day, time, room, faculty) => {
    if (!isDragging) {
      setSelectedSubject({ subject, day, time, room, faculty });
      setShowSubjectModal(true);
    }
    setIsDragging(false);
  };

  const changeFaculty = (subject, time, dayIdx) => {
    if (!isDragging) {
      setCurrentSubject({ subject, time, dayIdx });
      // Generate 9 random faculty options
      const options = [];
      for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * facultyNames.length);
        options.push(facultyNames[randomIndex]);
      }
      setFacultyOptions(options);
      setShowFacultyModal(true);
    }
  };

  const selectFaculty = (facultyName) => {
    const key = `${currentSubject.time}-${currentSubject.dayIdx}`;
    setSubjectFaculties(prev => ({
      ...prev,
      [key]: facultyName
    }));
    setShowFacultyModal(false);
  };

  // Drag and drop handlers
  const handleDragStart = (e, time, dayIdx, subject, isFromTimetable = true) => {
    setIsDragging(true);
    
    if (isFromTimetable) {
      // Dragging from timetable
      const subjectData = timetableData[time][dayIdx];
      if (subjectData.subject === 'Break') return;
      
      setDraggedItem({ 
        time, 
        dayIdx, 
        subject: subjectData.subject, 
        isFromTimetable,
        originalTime: time,
        originalDayIdx: dayIdx
      });
      
      // Set drag image for better visual feedback
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', `${time}-${dayIdx}`);
      }
    } else {
      // Dragging from available subjects
      setDraggedItem({ 
        subject, 
        isFromTimetable: false 
      });
      
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', subject);
      }
    }
    
    // For mobile touch events
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
  };

  const handleDragOver = (e, time, dayIdx) => {
    e.preventDefault();
    
    if (draggedItem) {
      const overSubject = timetableData[time][dayIdx];
      
      // Don't allow dropping on breaks if dragging from timetable
      if (draggedItem.isFromTimetable && overSubject.subject === 'Break') return;
      
      e.currentTarget.classList.add('bg-opacity-30', 'bg-blue-200');
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-opacity-30', 'bg-blue-200');
  };

  const handleDrop = (e, time, dayIdx) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-opacity-30', 'bg-blue-200');
    
    if (draggedItem) {
      const dropCell = timetableData[time][dayIdx];
      
      // Don't allow dropping on breaks if dragging from timetable
      if (draggedItem.isFromTimetable && dropCell.subject === 'Break') return;
      
      const newTimetableData = { ...timetableData };
      
      if (draggedItem.isFromTimetable) {
        // Moving subject within timetable
        const draggedSubject = newTimetableData[draggedItem.time][draggedItem.dayIdx];
        
        // Swap the subjects
        const temp = newTimetableData[time][dayIdx];
        newTimetableData[time][dayIdx] = draggedSubject;
        newTimetableData[draggedItem.time][draggedItem.dayIdx] = temp;
      } else {
        // Adding new subject from available subjects
        newTimetableData[time][dayIdx] = { 
          ...newTimetableData[time][dayIdx], 
          subject: draggedItem.subject,
          isBreak: false
        };
        
        // Update faculty for the new subject
        const key = `${time}-${dayIdx}`;
        setSubjectFaculties(prev => ({
          ...prev,
          [key]: facultyNames[Math.floor(Math.random() * facultyNames.length)]
        }));
      }
      
      setTimetableData(newTimetableData);
      setDraggedItem(null);
    }
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
  };

  const clearCell = (time, dayIdx) => {
    const newTimetableData = { ...timetableData };
    newTimetableData[time][dayIdx] = { 
      ...newTimetableData[time][dayIdx], 
      subject: "Break",
      isBreak: true
    };
    setTimetableData(newTimetableData);
  };

  const getThemeClasses = () => {
    const themes = {
      purple: {
        headerBg: 'bg-gradient-to-r from-purple-700 via-purple-600 to-blue-600',
        subjectBg: 'bg-blue-50',
        subjectBorder: 'border-l-4 border-blue-600',
        subjectHover: 'hover:shadow-lg',
        underline: 'bg-gradient-to-r from-purple-700 to-blue-600',
        dragOver: 'bg-blue-100',
        availableSubject: 'bg-purple-100 border-purple-300'
      },
      green: {
        headerBg: 'bg-gradient-to-r from-green-700 via-green-600 to-green-400',
        subjectBg: 'bg-green-50',
        subjectBorder: 'border-l-4 border-green-500',
        subjectHover: 'hover:shadow-lg',
        underline: 'bg-gradient-to-r from-green-700 to-green-400',
        dragOver: 'bg-green-100',
        availableSubject: 'bg-green-100 border-green-300'
      },
      orange: {
        headerBg: 'bg-gradient-to-r from-orange-700 via-orange-600 to-orange-400',
        subjectBg: 'bg-orange-50',
        subjectBorder: 'border-l-4 border-orange-500',
        subjectHover: 'hover:shadow-lg',
        underline: 'bg-gradient-to-r from-orange-700 to-orange-400',
        dragOver: 'bg-orange-100',
        availableSubject: 'bg-orange-100 border-orange-300'
      },
      pink: {
        headerBg: 'bg-gradient-to-r from-pink-700 via-pink-600 to-pink-400',
        subjectBg: 'bg-pink-50',
        subjectBorder: 'border-l-4 border-pink-600',
        subjectHover: 'hover:shadow-lg',
        underline: 'bg-gradient-to-r from-pink-700 to-pink-400',
        dragOver: 'bg-pink-100',
        availableSubject: 'bg-pink-100 border-pink-300'
      }
    };
    return themes[theme];
  };

  const themeClasses = getThemeClasses();

  return (
    <section className="max-w-7xl mx-auto my-8 p-4 sm:p-5 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300">
      {/* Header */}
      <h2 className="text-center mb-4 sm:mb-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative pb-3">
        DEMO TimeTable by TimeLazy
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-2 ${themeClasses.underline} rounded-sm`}></div>
      </h2>

      {/* Theme Controls */}
      <div className="flex justify-center mb-4 sm:mb-5 gap-2">
        <div 
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-700 to-blue-600 border-2 border-white cursor-pointer shadow-[0_2px_5px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-125"
          onClick={() => changeTheme('purple')}
        ></div>
        <div 
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-green-700 to-green-400 border-2 border-white cursor-pointer shadow-[0_2px_5px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-125"
          onClick={() => changeTheme('green')}
        ></div>
        <div 
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 border-2 border-white cursor-pointer shadow-[0_2px_5px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-125"
          onClick={() => changeTheme('orange')}
        ></div>
        <div 
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-pink-700 to-pink-400 border-2 border-white cursor-pointer shadow-[0_2px_5px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-125"
          onClick={() => changeTheme('pink')}
        ></div>
      </div>

      {/* Features Info */}
      <div className="bg-blue-50 p-2 sm:p-2.5 rounded-lg mb-4 sm:mb-5 text-sm sm:text-lg md:text-xl border-l-4 border-blue-600">
        <strong>💡 Features:</strong> Drag subjects from the list below to any cell, rearrange existing subjects, click for details, or double-click to change faculty
      </div>

      {/* Available Subjects */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Available Subjects (Drag to timetable):</h3>
        <div className="flex flex-wrap gap-2">
          {availableSubjects.map((subject, index) => (
            <div
              key={index}
              className={`${themeClasses.availableSubject} p-2 rounded-lg border-2 cursor-move shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md`}
              draggable
              onDragStart={(e) => handleDragStart(e, null, null, subject, false)}
              onTouchStart={(e) => handleDragStart(e, null, null, subject, false)}
              onTouchEnd={handleTouchEnd}
            >
              {subject}
            </div>
          ))}
        </div>
      </div>

      {/* Timetable */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className={`${themeClasses.headerBg} text-white p-3 sm:p-4 md:p-6 lg:p-8 text-center uppercase font-bold text-sm sm:text-base md:text-lg border border-gray-300 border-opacity-50`}>
                Time/Day
              </th>
              {days.map((day, index) => (
                <th 
                  key={index}
                  className={`${themeClasses.headerBg} text-white p-3 sm:p-4 md:p-6 lg:p-8 text-center uppercase font-bold text-sm sm:text-base md:text-lg border border-gray-300 border-opacity-50`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, rowIdx) => (
              <tr key={rowIdx}>
                <td className={`${themeClasses.headerBg} text-white font-bold p-3 sm:p-4 md:p-6 lg:p-8 text-center text-xs sm:text-sm md:text-base border border-gray-300 border-opacity-50`}>
                  {time}
                </td>
                {days.map((day, colIdx) => {
                  const subjectData = timetableData[time][colIdx];
                  const subject = subjectData.subject;
                  const room = sampleRooms[(rowIdx * days.length + colIdx) % sampleRooms.length];
                  const faculty = subject !== 'Break' ? generateFaculty(time, colIdx) : null;
                  
                  return (
                    <td 
                      key={`${rowIdx}-${colIdx}`} 
                      className="p-2 sm:p-3 md:p-4 lg:p-6 text-center transition-all duration-300 border border-gray-300 border-opacity-50"
                      onDragOver={(e) => handleDragOver(e, time, colIdx)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, time, colIdx)}
                    >
                      <div
                        className={`
                          block rounded-md p-2 sm:p-3 font-bold shadow-[0_2px_5px_rgba(0,0,0,0.1)] 
                          transition-all duration-300 cursor-move select-none relative z-10 mx-auto w-full
                          ${subject === 'Break' ? 'bg-gray-100 cursor-default' : `${themeClasses.subjectBg} ${themeClasses.subjectBorder} cursor-move`}
                          ${themeClasses.subjectHover}
                          text-gray-800 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]
                        `}
                        draggable={subject !== 'Break'}
                        onDragStart={(e) => handleDragStart(e, time, colIdx, subject, true)}
                        onTouchStart={(e) => handleDragStart(e, time, colIdx, subject, true)}
                        onTouchEnd={handleTouchEnd}
                        onClick={() => showSubjectDetails(subject, day, time, room, faculty)}
                        onDoubleClick={() => subject !== 'Break' && changeFaculty(subject, time, colIdx)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          if (subject !== 'Break') clearCell(time, colIdx);
                        }}
                      >
                        <div className="text-xs sm:text-sm md:text-base">{subject}</div>
                        {faculty && (
                          <span className="block text-xs mt-1 opacity-80 italic">
                            {faculty}
                          </span>
                        )}
                        {subject !== 'Break' && (
                          <button 
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              clearCell(time, colIdx);
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
        <p className="font-bold mb-2">How to use:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Drag subjects from the available list to any cell in the timetable</li>
          <li>Drag existing subjects to rearrange them</li>
          <li>Click on a subject to view details</li>
          <li>Double-click to change faculty</li>
          <li>Right-click or tap the × button to clear a cell</li>
        </ul>
      </div>

      {/* Subject Details Modal */}
      {showSubjectModal && selectedSubject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4"
          style={{ display: 'flex' }}
        >
          <div className="bg-white p-4 sm:p-5 rounded-xl max-w-md w-full shadow-[0_15px_30px_rgba(0,0,0,0.2)] transform transition-all duration-300 scale-100 opacity-100">
            <div className="relative">
              <span 
                className="absolute top-2 right-2 text-2xl text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setShowSubjectModal(false)}
              >
                ×
              </span>
              <h3 className="text-xl font-bold mb-4">Subject Details</h3>
              <p className="mb-2"><strong>Subject:</strong> {selectedSubject.subject}</p>
              <p className="mb-2"><strong>Day:</strong> {selectedSubject.day}</p>
              <p className="mb-2"><strong>Time:</strong> {selectedSubject.time}</p>
              <p className="mb-2"><strong>Location:</strong> {selectedSubject.room}</p>
              <p><strong>Faculty:</strong> {selectedSubject.faculty || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Selection Modal */}
      {showFacultyModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4"
          style={{ display: 'flex' }}
        >
          <div className="bg-white p-4 sm:p-5 rounded-xl max-w-lg w-full shadow-[0_15px_30px_rgba(0,0,0,0.2)] transform transition-all duration-300 scale-100 opacity-100">
            <div className="relative">
              <span 
                className="absolute top-2 right-2 text-2xl text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setShowFacultyModal(false)}
              >
                ×
              </span>
              <h3 className="text-xl font-bold mb-4">Select Faculty</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                {facultyOptions.map((faculty, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-2 text-center rounded cursor-pointer transition-all duration-200 hover:bg-blue-100 hover:-translate-y-1"
                    onClick={() => selectFaculty(faculty)}
                  >
                    {faculty}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TimetableDemo;