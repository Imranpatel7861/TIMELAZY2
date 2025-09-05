import React from 'react';

const Hero = () => {
  const scrollToSection = (id, offset = 0) => {
    const section = document.getElementById(id);
    if (section) {
      const y = section.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 pt-16 md:pt-0">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs - 2025 trending colors */}
        <div className="absolute -top-1/4 -right-1/6 w-96 h-96 md:w-[500px] md:h-[500px] xl:w-[600px] xl:h-[600px] bg-gradient-radial from-violet-400/30 via-fuchsia-400/15 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/3 -left-1/5 w-80 h-80 md:w-[600px] md:h-[600px] xl:w-[800px] xl:h-[800px] bg-gradient-radial from-cyan-400/25 via-emerald-400/10 to-transparent rounded-full animate-pulse delay-1000"></div>
        
        {/* Subtle accent orb */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-radial from-orange-300/20 via-amber-300/5 to-transparent rounded-full animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 25s linear infinite'
          }}
        ></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center relative z-10">
          {/* Content Section - Mobile first approach */}
          <div className="lg:col-span-7 xl:col-span-6 text-white space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold leading-[1.1] animate-fadeInUp">
              Master Your{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  Time
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 rounded animate-expandWidth"></div>
              </span>
              ,<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Exchange Your Tradition with{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  TimeLazy
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 md:h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded animate-expandWidth delay-500"></div>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-relaxed text-slate-300 max-w-2xl mx-auto lg:mx-0 animate-fadeInUp delay-200">
              Create intelligent, dynamic timetables that align with your organization's needs.
              Eliminate scheduling chaos and foster seamless coordination across teams and departments.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-fadeInUp delay-300">
              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm md:text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-1 active:scale-95 group"
                onClick={() => scrollToSection('ChooseMode', -50)}
              >
                <span>Start Organizing</span>
                <svg 
                  width="16" 
                  height="16"
                  className="md:w-5 md:h-5"
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/10 text-white text-sm md:text-base font-medium rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:-translate-y-1 active:scale-95"
                onClick={() => scrollToSection('TimetableDemo', -20)}
              >
                <svg width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
                  <polygon fill="currentColor" points="9.5,7.5 9.5,16.5 16.5,12"/>
                </svg>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Visual Section - Responsive phone mockup */}
          <div className="lg:col-span-5 xl:col-span-6 flex justify-center items-center mt-8 lg:mt-0 animate-fadeInRight delay-300">
            <div className="relative">
              {/* Phone Mockup - Responsive sizes */}
              <div className="w-72 sm:w-80 md:w-96 lg:w-80 xl:w-96 h-[480px] sm:h-[520px] md:h-[600px] lg:h-[520px] xl:h-[600px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-[20px] md:rounded-[30px] p-3 md:p-5 shadow-2xl backdrop-blur-sm border border-white/10 animate-float">
                <div className="w-full h-full bg-gradient-to-b from-slate-900/95 to-slate-800/95 rounded-[15px] md:rounded-[20px] p-4 md:p-6 lg:p-8 overflow-hidden relative backdrop-blur-sm">
                  {/* Time Header */}
                  <div className="text-center mb-6 md:mb-8">
                    <div className="text-2xl md:text-3xl xl:text-4xl font-bold text-violet-400 mb-1 md:mb-2">9:30 AM</div>
                    <div className="text-slate-400 text-sm md:text-base">Today, Oct 15</div>
                  </div>

                  {/* Schedule Items */}
                  <div className="space-y-3 md:space-y-4 mt-4 sm:mt-0">
                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-violet-500/15 rounded-lg md:rounded-xl border-l-3 md:border-l-4 border-violet-400 transform scale-105 transition-all duration-300 shadow-lg shadow-violet-500/10 mx-2 sm:mx-0">
                      <div className="text-violet-400 font-semibold text-xs md:text-sm min-w-8 md:min-w-12">9:30</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm md:text-base mb-0.5 md:mb-1">Team Meeting</div>
                        <div className="text-slate-400 text-xs md:text-sm">Conference Room A</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl border-l-3 md:border-l-4 border-transparent transition-all duration-300 hover:bg-white/10 hover:border-slate-400 mx-2 sm:mx-0">
                      <div className="text-violet-400 font-semibold text-xs md:text-sm min-w-8 md:min-w-12">11:00</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm md:text-base mb-0.5 md:mb-1">Project Review</div>
                        <div className="text-slate-400 text-xs md:text-sm">Online</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 rounded-lg md:rounded-xl border-l-3 md:border-l-4 border-transparent transition-all duration-300 hover:bg-white/10 hover:border-slate-400 mx-2 sm:mx-0">
                      <div className="text-violet-400 font-semibold text-xs md:text-sm min-w-8 md:min-w-12">2:30</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm md:text-base mb-0.5 md:mb-1">Client Call</div>
                        <div className="text-slate-400 text-xs md:text-sm">Zoom</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-fuchsia-400 to-violet-400 rounded-full opacity-80 animate-bounce delay-1000"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 md:w-10 md:h-10 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full opacity-60 animate-bounce delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for animations and effects */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes expandWidth {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(-1deg); 
          }
          50% { 
            transform: translateY(-8px) rotate(1deg); 
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }
        
        .animate-fadeInUp.delay-200 {
          animation-delay: 0.5s;
        }
        
        .animate-fadeInUp.delay-300 {
          animation-delay: 0.7s;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out both;
        }
        
        .animate-fadeInRight.delay-300 {
          animation-delay: 0.7s;
        }
        
        .animate-expandWidth {
          animation: expandWidth 1s ease-out 0.8s both;
        }
        
        .animate-expandWidth.delay-500 {
          animation-delay: 1.3s;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }

        /* Enhanced mobile touch targets */
        @media (max-width: 640px) {
          button {
            min-height: 48px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;