import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [isHidden, setIsHidden] = useState(false);

  // Demo function to hide loader after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`
        fixed top-0 left-0 w-full h-full
        bg-gradient-to-br from-black to-black
        flex justify-center items-center
        z-[9999]
        transition-all duration-700 ease-in-out
        ${isHidden ? 'opacity-0 invisible' : 'opacity-100 visible'}
      `}
    >
      {/* Main loader container - responsive sizing */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]">
        
        {/* Spinning circles */}
        <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent rounded-full animate-spin border-t-orange-500" 
             style={{ animationDuration: '3s', animationDelay: '0s' }} />
        
        <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent rounded-full animate-spin border-r-pink-500"
             style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        
        <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent rounded-full animate-spin border-b-green-400"
             style={{ animationDuration: '3s', animationDelay: '1s' }} />
        
        <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent rounded-full animate-spin border-l-purple-600"
             style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
        
        {/* Ripple effects - responsive sizing */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-white/10 animate-pulse"
             style={{ 
               animation: 'ripple 2s linear infinite',
               animationDelay: '0s'
             }} />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-white/10"
             style={{ 
               animation: 'ripple 2s linear infinite',
               animationDelay: '0.7s'
             }} />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-white/10"
             style={{ 
               animation: 'ripple 2s linear infinite',
               animationDelay: '1.4s'
             }} />
        
        {/* Logo text - responsive font sizing */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold uppercase tracking-wider opacity-80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          TIMELAZY
        </div>
      </div>

      {/* Custom CSS for ripple animation */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 120px;
            height: 120px;
            opacity: 0;
          }
        }
        
        @media (min-width: 640px) {
          @keyframes ripple {
            100% {
              width: 150px;
              height: 150px;
            }
          }
        }
        
        @media (min-width: 768px) {
          @keyframes ripple {
            100% {
              width: 180px;
              height: 180px;
            }
          }
        }
        
        @media (min-width: 1024px) {
          @keyframes ripple {
            100% {
              width: 200px;
              height: 200px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;