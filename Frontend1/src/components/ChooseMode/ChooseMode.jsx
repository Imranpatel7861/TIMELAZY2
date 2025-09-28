import React from 'react';
import { User, Users, Building } from 'lucide-react';

const ChooseMode = () => {
  return (
    <section className="max-w-[1400px] mx-auto text-center px-5 py-16 bg-gray-50">
      <h2
        className="text-5xl mb-6 bg-gradient-to-br from-purple-600 to-blue-500 bg-clip-text text-transparent font-bold md:text-4xl"
      >
        Choose Your Mode
      </h2>
      <p
        className="text-gray-600 mb-16 text-xl max-w-[700px] mx-auto"
      >
        Whether you're planning for yourself, your team, or a whole organization—we've got you covered.
      </p>
      <div className="flex flex-wrap gap-8 justify-center items-stretch">
        {/* Personal Card */}
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 flex-1 min-w-[320px] max-w-[400px] transition-all duration-500 ease-out relative overflow-hidden border border-gray-100 flex flex-col justify-between hover:-translate-y-2 hover:scale-[1.02] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-emerald-600 before:to-emerald-400 hover:before:h-2 before:transition-all before:duration-300">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
              <User className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-3xl mb-4 text-gray-800 font-semibold">Personal</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Perfect for students, teachers, or freelancers managing their own schedule.
            </p>
          </div>
          <ul className="text-left mb-8 space-y-3">
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              AI-powered daily planner
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Study & work modes
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Mobile optimized
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Progress tracking
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Smart reminders
            </li>
          </ul>
          <a
            href="/LoginPer"
            className="inline-block py-3 px-8 rounded-full text-white font-semibold transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 hover:-translate-y-1 hover:shadow-lg transform"
          >
            Start for Free
          </a>
        </div>

        {/* Team Card */}
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 flex-1 min-w-[320px] max-w-[400px] transition-all duration-500 ease-out relative overflow-hidden border border-gray-100 flex flex-col justify-between hover:-translate-y-2 hover:scale-[1.02] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 hover:before:h-2 before:transition-all before:duration-300">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
              <Users className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-3xl mb-4 text-gray-800 font-semibold">Team</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Collaborate and schedule smarter with shared access and real-time updates.
            </p>
          </div>
          <ul className="text-left mb-8 space-y-3">
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Shared calendar & tasks
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Real-time collaboration
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Manage class assignments
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Group analytics
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Role-based permissions
            </li>
          </ul>
          <a
            href="/seating"
            className="inline-block py-3 px-8 rounded-full text-white font-semibold transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 hover:-translate-y-1 hover:shadow-lg transform"
          >
            Try Team Mode
          </a>
        </div>

        {/* Organization Card */}
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 flex-1 min-w-[320px] max-w-[400px] transition-all duration-500 ease-out relative overflow-hidden border border-gray-100 flex flex-col justify-between hover:-translate-y-2 hover:scale-[1.02] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-600 hover:before:h-2 before:transition-all before:duration-300">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
              <Building className="w-12 h-12 text-gray-800 stroke-2" />
            </div>
            <h3 className="text-3xl mb-4 text-gray-800 font-semibold">Organization</h3>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Built for schools, colleges, and training centers to manage everything at scale.
            </p>
          </div>
          <ul className="text-left mb-8 space-y-3">
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Admin dashboard
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Bulk timetable generation
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Analytics & role access
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              Custom reporting
            </li>
            <li className="text-gray-600 relative pl-6 transition-all duration-300 hover:translate-x-1 hover:text-gray-700 before:content-['✓'] before:absolute before:left-0 before:text-emerald-600 before:font-bold">
              API integration
            </li>
          </ul>
          <a
            href="/Loginad"
            className="inline-block py-3 px-8 rounded-full text-white font-semibold transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-blue-600 hover:to-cyan-400 hover:-translate-y-1 hover:shadow-lg transform"
          >
            Request Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChooseMode;
