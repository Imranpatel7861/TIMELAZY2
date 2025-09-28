import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Users,
  Calendar,
  Plus,
  Eye,
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';
import styles from './Overview.module.css';

const Overview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animateStats, setAnimateStats] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimateStats(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      title: 'Total Classes', 
      value: '248', 
      change: '+12%', 
      icon: BookOpen, 
      color: 'blue',
      trend: 'up'
    },
    { 
      title: 'Active Teachers', 
      value: '45', 
      change: '+5%', 
      icon: Users, 
      color: 'green',
      trend: 'up'
    },
    { 
      title: 'Students', 
      value: '1,247', 
      change: '+8%', 
      icon: Users, 
      color: 'purple',
      trend: 'up'
    },
    { 
      title: 'Schedules', 
      value: '18', 
      change: '+2%', 
      icon: Calendar, 
      color: 'orange',
      trend: 'up'
    }
  ];

  const recentActivities = [
    { 
      action: 'New timetable created for Computer Science', 
      time: '2 hours ago', 
      type: 'create',
      user: 'Dr. Smith'
    },
    { 
      action: 'Mathematics class rescheduled to Room B-205', 
      time: '4 hours ago', 
      type: 'edit',
      user: 'Prof. Johnson'
    },
    { 
      action: 'Teacher profile updated with new qualifications', 
      time: '6 hours ago', 
      type: 'update',
      user: 'Ms. Williams'
    },
    { 
      action: 'New student enrolled in Biology program', 
      time: '1 day ago', 
      type: 'add',
      user: 'Admin'
    }
  ];

  const upcomingClasses = [
    { 
      subject: 'Advanced Mathematics', 
      teacher: 'Dr. Smith', 
      time: '10:00 AM', 
      room: 'A-101', 
      students: 45,
      duration: '90 min',
      status: 'scheduled'
    },
    { 
      subject: 'Quantum Physics', 
      teacher: 'Prof. Johnson', 
      time: '11:30 AM', 
      room: 'B-205', 
      students: 38,
      duration: '75 min',
      status: 'in-progress'
    },
    { 
      subject: 'Organic Chemistry', 
      teacher: 'Dr. Williams', 
      time: '2:00 PM', 
      room: 'C-301', 
      students: 42,
      duration: '60 min',
      status: 'upcoming'
    },
    { 
      subject: 'Molecular Biology', 
      teacher: 'Ms. Brown', 
      time: '3:30 PM', 
      room: 'D-102', 
      students: 40,
      duration: '90 min',
      status: 'upcoming'
    }
  ];

  const quickActions = [
    { 
      label: 'Create Timetable', 
      icon: Plus, 
      color: 'blue',
      description: 'Design new class schedules'
    },
    { 
      label: 'Add Teacher', 
      icon: Users, 
      color: 'green',
      description: 'Register new faculty member'
    },
    { 
      label: 'Schedule Class', 
      icon: Calendar, 
      color: 'purple',
      description: 'Book classroom and time slot'
    },
    { 
      label: 'View Reports', 
      icon: Eye, 
      color: 'orange',
      description: 'Analyze performance metrics'
    }
  ];

  const handleQuickAction = (action) => {
    console.log(`Quick action clicked: ${action.label}`);
    // Add your navigation or action logic here
  };

  const AnimatedCounter = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!animateStats) return;
      
      const numValue = parseInt(value.replace(/,/g, ''));
      const increment = numValue / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numValue) {
          setCount(numValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [value, duration, animateStats]);
    
    return count.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className={styles.overviewContent}>
        <div className={styles.statsGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`${styles.statCard} ${styles.loading}`}>
              <div style={{ height: '120px' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overviewContent}>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`${styles.statCard} ${styles[`statCard${stat.color.charAt(0).toUpperCase() + stat.color.slice(1)}`]}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={styles.statContent}>
                <div className={styles.statInfo}>
                  <p className={styles.statTitle}>{stat.title}</p>
                  <p className={styles.statValue}>
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className={styles.statChange}>
                    <TrendingUp size={14} style={{ marginRight: '4px' }} />
                    {stat.change}
                  </p>
                </div>
                <div className={`${styles.statIcon} ${styles[`icon${stat.color.charAt(0).toUpperCase() + stat.color.slice(1)}`]}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.contentGrid}>
        {/* Upcoming Classes */}
        <div className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Clock size={20} style={{ marginRight: '8px' }} />
              Today's Classes
            </h3>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.cardContent}>
            {upcomingClasses.map((class_, index) => (
              <div key={index} className={styles.classItem}>
                <div className={styles.classInfo}>
                  <h4 className={styles.classSubject}>{class_.subject}</h4>
                  <p className={styles.classDetails}>
                    <Users size={14} style={{ marginRight: '4px' }} />
                    {class_.teacher} • 
                    <MapPin size={14} style={{ margin: '0 4px' }} />
                    Room {class_.room} • 
                    <Clock size={14} style={{ margin: '0 4px' }} />
                    {class_.duration}
                  </p>
                </div>
                <div className={styles.classTime}>
                  <p className={styles.timeText}>{class_.time}</p>
                  <p className={styles.studentsText}>
                    {class_.students} students
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <TrendingUp size={20} style={{ marginRight: '8px' }} />
              Recent Activities
            </h3>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.cardContent}>
            {recentActivities.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={`${styles.activityDot} ${styles[`dot${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}`]}`}></div>
                <div className={styles.activityContent}>
                  <p className={styles.activityAction}>{activity.action}</p>
                  <p className={styles.activityTime}>
                    {activity.time} • by {activity.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.contentCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            <Plus size={20} style={{ marginRight: '8px' }} />
            Quick Actions
          </h3>
        </div>
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button 
                key={action.label} 
                className={styles.quickAction}
                onClick={() => handleQuickAction(action)}
                title={action.description}
              >
                <div className={`${styles.quickActionIcon} ${styles[`icon${action.color.charAt(0).toUpperCase() + action.color.slice(1)}`]}`}>
                  <Icon size={20} />
                </div>
                <span className={styles.quickActionLabel}>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;