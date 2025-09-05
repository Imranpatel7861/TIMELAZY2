import React from 'react';
import {
  BookOpen,
  Users,
  Calendar,
  Plus,
  Eye
} from 'lucide-react';

const Overview = () => {
  const stats = [
    { title: 'Total Classes', value: '248', change: '+12%', icon: BookOpen, color: 'blue' },
    { title: 'Active Teachers', value: '45', change: '+5%', icon: Users, color: 'green' },
    { title: 'Students', value: '1,247', change: '+8%', icon: Users, color: 'purple' },
    { title: 'Schedules', value: '18', change: '+2%', icon: Calendar, color: 'orange' }
  ];

  const recentActivities = [
    { action: 'New timetable created', time: '2 hours ago', type: 'create' },
    { action: 'Math class rescheduled', time: '4 hours ago', type: 'edit' },
    { action: 'Teacher profile updated', time: '6 hours ago', type: 'update' },
    { action: 'Student enrolled', time: '1 day ago', type: 'add' }
  ];

  const upcomingClasses = [
    { subject: 'Mathematics', teacher: 'Dr. Smith', time: '10:00 AM', room: 'A-101', students: 45 },
    { subject: 'Physics', teacher: 'Prof. Johnson', time: '11:30 AM', room: 'B-205', students: 38 },
    { subject: 'Chemistry', teacher: 'Dr. Williams', time: '2:00 PM', room: 'C-301', students: 42 },
    { subject: 'Biology', teacher: 'Ms. Brown', time: '3:30 PM', room: 'D-102', students: 40 }
  ];

  const quickActions = [
    { label: 'Create Timetable', icon: Plus, color: 'blue' },
    { label: 'Add Teacher', icon: Users, color: 'green' },
    { label: 'Schedule Class', icon: Calendar, color: 'purple' },
    { label: 'View Reports', icon: Eye, color: 'orange' }
  ];

  const getStatCardColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-emerald-500',
      purple: 'bg-violet-500',
      orange: 'bg-amber-500'
    };
    return colors[color];
  };

  const getActivityDotColor = (type) => {
    const colors = {
      create: 'bg-emerald-500',
      edit: 'bg-blue-500',
      update: 'bg-amber-500',
      add: 'bg-violet-500'
    };
    return colors[type];
  };

  const getQuickActionIconColor = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-emerald-500',
      purple: 'bg-violet-500',
      orange: 'bg-amber-500'
    };
    return colors[color];
  };

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6">
      <div className="flex flex-col gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 transition-all duration-300 ease-out relative overflow-hidden shadow-sm hover:shadow-md transform hover:-translate-y-1 animate-[slideInUp_0.6s_ease-out] opacity-0 animate-[slideInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-emerald-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg transition-all duration-300 relative z-10 text-white ${getStatCardColorClasses(stat.color)}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm transition-all duration-300 border border-gray-200/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Today's Classes</h3>
              <button className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl relative overflow-hidden">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{class_.subject}</h4>
                    <p className="text-sm text-gray-500">{class_.teacher} • Room {class_.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 mb-1">{class_.time}</p>
                    <p className="text-sm text-gray-500">{class_.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm transition-all duration-300 border border-gray-200/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
              <button className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-7 h-7 rounded-full mt-2 relative ${getActivityDotColor(activity.type)}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm transition-all duration-300 border border-gray-200/30 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button key={action.label} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all duration-300 group">
                  <div className={`p-3 rounded-lg mb-3 text-white transition-all duration-300 ${getQuickActionIconColor(action.color)}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors text-center">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Overview;