// Footer.jsx
import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-5');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.footer-section');
    const copyright = document.querySelector('.copyright-section');

    sections.forEach((section) => observer.observe(section));
    if (copyright) observer.observe(copyright);

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      className="bg-indigo-950 text-white px-5 py-10 flex flex-col gap-8 opacity-0 translate-y-5 transition-all duration-1000 ease-out footer-section" 
      id="footerSection"
    >
      <div className="flex flex-wrap justify-between gap-8">
        {/* Company Info */}
        <div className="footer-section opacity-0 translate-y-5 transition-all duration-1000 ease-out">
          <h3 className="mb-4 text-2xl text-purple-500">TimeLazy</h3>
          <p className="text-xl text-gray-300 mb-4">
            Providing innovative AI driven Timetables since 2025. We're dedicated
            to helping our customers succeed.
          </p>
          <div className="flex gap-8">
            <a 
              href="https://www.facebook.com/profile.php?id=61570261174985&mibextid=ZbWKwL" 
              className="text-gray-300 text-4xl hover:text-yellow-400 transition-colors duration-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a 
              href="https://x.com/incorbis?t=yRcNnKknmtATHWpOXWnA6w&s=09" 
              className="text-gray-300 text-4xl hover:text-yellow-400 transition-colors duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a 
              href="#" 
              className="text-gray-300 text-4xl hover:text-yellow-400 transition-colors duration-300"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a 
              href="https://www.instagram.com/incorbis.official?igsh=dXRhdzh5NGdlency" 
              className="text-gray-300 text-4xl hover:text-yellow-400 transition-colors duration-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section opacity-0 translate-y-5 transition-all duration-1000 ease-out">
          <h3 className="mb-4 text-2xl text-purple-500">Quick Links</h3>
          <ul className="list-none p-0">
            <li className="mb-3">
              <a href="#" className="text-xl text-gray-300 no-underline hover:text-yellow-400 transition-colors duration-300">
                Home
              </a>
            </li>
            <li className="mb-3">
              <a href="/about" className="text-xl text-gray-300 no-underline hover:text-yellow-400 transition-colors duration-300">
                About Us
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-xl text-gray-300 no-underline hover:text-yellow-400 transition-colors duration-300">
                Services
              </a>
            </li>
            <li className="mb-3">
              <a href="/ContactUs" className="text-xl text-gray-300 no-underline hover:text-yellow-400 transition-colors duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section opacity-0 translate-y-5 transition-all duration-1000 ease-out">
          <h3 className="mb-4 text-2xl text-purple-500">Services</h3>
          <ul className="list-none p-0">
            <li className="mb-3">
              <a href="/dashboard" className="text-xl text-gray-300 no-underline hover:text-yellow-400 transition-colors duration-300">
                AI TimeTable
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-xl text-gray-300 no-underline hover:text-yellow-400 transition-colors duration-300">
                AI Planner
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="text-xl text-gray-300 no-underline hover:text-yellow-400 transition-colors duration-300">
                AI Seating Planner
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section opacity-0 translate-y-5 transition-all duration-1000 ease-out">
          <h3 className="mb-4 text-2xl text-purple-500">Contact Us</h3>
          <p className="text-xl text-gray-300">Email: support@timelazy.com</p>
        </div>
      </div>

      <div className="text-center text-base sm:text-lg lg:text-xl text-gray-400 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700 opacity-0 transition-opacity duration-2000 ease-out copyright-section">
        <p>&copy; 2025 TIMELAZY. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;