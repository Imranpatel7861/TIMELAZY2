import React from 'react';
import chooseModeCSS from './ChooseMode.module.css';

const ChooseMode = () => {
  return (
    <section id="modeSelection" className={chooseModeCSS.modeSelectionContainer}>
      <h2 className={chooseModeCSS.modeSelectionHeading} data-aos="fade-up">
        Choose Your Mode
      </h2>
      <p className={chooseModeCSS.modeSelectionSubheading} data-aos="fade-up" data-aos-delay="100">
        Whether you're planning for yourself, your team, or a whole organization—we've got you covered.
      </p>
      <div className={chooseModeCSS.modeCardsWrapper}>
        {/* Personal Card */}
        <div className={chooseModeCSS.modeCard} data-aos="fade-up" data-aos-delay="200">
          <div className={chooseModeCSS.modeCardIcon}>
            <i className="fas fa-user"></i>
          </div>
          <h3 className={chooseModeCSS.modeCardHeading}>Personal</h3>
          <p className={chooseModeCSS.modeCardDescription}>
            Perfect for students, teachers, or freelancers managing their own schedule.
          </p>
          <ul className={chooseModeCSS.modeCardFeatures}>
            <li>AI-powered daily planner</li>
            <li>Study & work modes</li>
            <li>Mobile optimized</li>
            <li>Progress tracking</li>
            <li>Smart reminders</li>
          </ul>
          <a href="/LoginPer" className={`${chooseModeCSS.modeCardButton} ${chooseModeCSS.modeCardButtonPersonal}`}>
            Start for Free
          </a>
        </div>

        {/* Team Card */}
        <div className={chooseModeCSS.modeCard} data-aos="fade-up" data-aos-delay="400">
          <div className={chooseModeCSS.modeCardIcon}>
            <i className="fas fa-users"></i>
          </div>
          <h3 className={chooseModeCSS.modeCardHeading}>Team</h3>
          <p className={chooseModeCSS.modeCardDescription}>
            Collaborate and schedule smarter with shared access and real-time updates.
          </p>
          <ul className={chooseModeCSS.modeCardFeatures}>
            <li>Shared calendar & tasks</li>
            <li>Real-time collaboration</li>
            <li>Manage class assignments</li>
            <li>Group analytics</li>
            <li>Role-based permissions</li>
          </ul>
          <a href="/seating" className={`${chooseModeCSS.modeCardButton} ${chooseModeCSS.modeCardButtonTeam}`}>
            Try Team Mode
          </a>
        </div>

        {/* Organization Card */}
        <div className={chooseModeCSS.modeCard} data-aos="fade-up" data-aos-delay="600">
          <div className={chooseModeCSS.modeCardIcon}>
            <i className="fas fa-university"></i>
          </div>
          <h3 className={chooseModeCSS.modeCardHeading}>Organization</h3>
          <p className={chooseModeCSS.modeCardDescription}>
            Built for schools, colleges, and training centers to manage everything at scale.
          </p>
          <ul className={chooseModeCSS.modeCardFeatures}>
            <li>Admin dashboard</li>
            <li>Bulk timetable generation</li>
            <li>Analytics & role access</li>
            <li>Custom reporting</li>
            <li>API integration</li>
          </ul>
          <a href="/Loginad" className={`${chooseModeCSS.modeCardButton} ${chooseModeCSS.modeCardButtonOrg}`}>
            Request Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChooseMode;
