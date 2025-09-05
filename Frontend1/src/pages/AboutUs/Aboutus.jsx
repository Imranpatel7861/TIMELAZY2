import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Import useNavigate

const About = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    // AOS animation effect simulation with CSS animations
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('aos-animate');
      }, index * 200);
    });
  }, []);

  const handleGoBack = () => {
    navigate('/'); // ✅ Navigate to Landing page
    console.log('Navigate to Landing page');
  };
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 overflow-x-hidden">
      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row lg:flex-wrap">
        {/* Content Area */}
        <div className="flex-1 min-w-[300px] lg:max-w-[50%] px-8 lg:px-16 py-16 bg-white">
          {/* Back Button */}
          <button 
            onClick={handleGoBack} 
            className="w-16 h-16 lg:w-20 lg:h-20 bg-black text-white border-none rounded-full cursor-pointer text-base mb-5 transition-all duration-300 hover:bg-gray-600 flex items-center justify-center"
          >
            Back
          </button>

          {/* About Text */}
          <div 
            className="opacity-0 transform translate-x-5 transition-all duration-1000 animate-fade-in-right" 
            data-aos="fade-right"
          >
            <h1 className="text-4xl lg:text-5xl mb-4 text-gray-900 font-bold">About Timelazy</h1>
            <p className="text-lg mt-4 text-gray-600 leading-relaxed">
              <strong>Timelazy</strong> is your smart AI-powered planner for schools and colleges. We help institutions automate the most complex task: building efficient, conflict-free timetables — instantly.
            </p>
          </div>

          {/* Section Divider */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent my-16 w-full"></div>

          {/* Team Section */}
          <section className="mb-12 bg-gray-100 p-8 rounded-lg transition-all duration-300">
            <h2 className="text-3xl text-gray-700 mb-4 opacity-0 transform -translate-x-5 transition-all duration-1000 animate-fade-in-left" data-aos="fade-left">
              About
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 items-center flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team Image"
                  loading="lazy"
                  className="w-full h-64 rounded-lg transition-transform duration-300 shadow-md hover:scale-105 hover:shadow-xl object-cover"
                />
              </div>
              <div className="flex-1 min-w-[250px]">
                <p className="text-lg text-gray-600 opacity-0 transform translate-x-5 transition-all duration-1000 animate-fade-in-right" data-aos="fade-right">
                  TechTrend Innovations was founded with a vision to revolutionize the tech industry. Our team of dedicated professionals works tirelessly to develop solutions that address real-world challenges, from AI-driven analytics to sustainable tech infrastructures.
                </p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg transition-all duration-300 hover:bg-blue-100">
            <h2 className="text-3xl text-gray-700 mb-4 opacity-0 transform -translate-x-5 transition-all duration-1000 animate-fade-in-left" data-aos="fade-left">
              Our Mission
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 items-center flex-wrap">
              <div className="flex-1 min-w-[250px] order-2 lg:order-1">
                <p className="text-lg text-gray-600 opacity-0 transform translate-x-5 transition-all duration-1000 animate-fade-in-right" data-aos="fade-right">
                  At TechTrend Innovations, we strive to push the boundaries of technology by creating innovative solutions that empower businesses and individuals. Our passion for cutting-edge tech drives us to deliver excellence.
                </p>
              </div>
              <div className="flex-1 min-w-[250px] order-1 lg:order-2">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/008/167/404/non_2x/simply-soft-gradation-technology-background-free-vector.jpg"
                  alt="Mission Image"
                  loading="lazy"
                  className="w-full h-64 rounded-lg transition-transform duration-300 shadow-md hover:scale-105 hover:shadow-xl object-cover"
                />
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="mb-12 bg-green-50 p-8 rounded-lg transition-all duration-300 hover:bg-green-100">
            <h2 className="text-3xl text-gray-700 mb-4 opacity-0 transform -translate-x-5 transition-all duration-1000 animate-fade-in-left" data-aos="fade-left">
              Our Vision
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 items-center flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Vision Image"
                  loading="lazy"
                  className="w-full h-64 rounded-lg transition-transform duration-300 shadow-md hover:scale-105 hover:shadow-xl object-cover"
                />
              </div>
              <div className="flex-1 min-w-[250px]">
                <p className="text-lg text-gray-600 opacity-0 transform translate-x-5 transition-all duration-1000 animate-fade-in-right" data-aos="fade-right">
                  We envision a world where technology seamlessly connects people, fosters creativity, and solves global challenges. TechTrend Innovations aims to lead this transformation with sustainable and inclusive solutions.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Video Area */}
        <div className="flex-1 lg:fixed lg:min-w-[300px] lg:w-[45%] lg:h-auto flex justify-center items-center bg-blue-50 p-8 lg:mt-48 lg:ml-[1200px] relative lg:top-0">
          <video
            className="w-[95%] max-w-4xl rounded-3xl shadow-lg border-4 border-blue-500"
            autoPlay
            loop
            muted
            playsInline
            title="Timelazy AI Demo Video"
            aria-label="Timelazy AI-generated timetable video"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 w-full relative z-10">
        <p className="transition-colors duration-300 hover:text-green-200">
          © 2025 Incorbis Innovations. All rights reserved.
        </p>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out forwards;
        }

        .aos-animate {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        /* Mobile responsiveness */
        @media (max-width: 1024px) {
          .lg\\:fixed {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            margin-top: 0 !important;
            margin-left: 0 !important;
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;