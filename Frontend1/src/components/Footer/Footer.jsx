import React, { useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.footer-section');
    const copyright = document.querySelector('.copyright');

    sections.forEach((section) => observer.observe(section));
    if (copyright) observer.observe(copyright);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Dummy content to show scroll effect */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Scroll down to see the footer animation</h1>
      </div>
      
      <footer className="footer-section bg-[#0a0a23] text-white px-6 py-12 opacity-0 translate-y-12 transition-all duration-800 ease-in-out" id="footerSection">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-10">
          {/* Company Info */}
          <div className="footer-section flex-1 min-w-[220px] opacity-0 translate-y-8 transition-all duration-600 ease-in-out delay-100">
            <h3 className="text-2xl font-semibold text-[#7b00ff] mb-3">
              TimeLazy
            </h3>
            <p className="text-lg text-gray-300 mb-4">
              Providing innovative AI driven Timetables since 2025. We're dedicated
              to helping our customers succeed.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="https://www.facebook.com/profile.php?id=61570261174985&mibextid=ZbWKwL"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={32} stroke="currentColor" fill="currentColor" />
              </a>
              <a
                href="https://x.com/incorbis?t=yRcNnKknmtATHWpOXWnA6w&s=09"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={32} stroke="currentColor" fill="currentColor" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
              >
                <Linkedin size={32} stroke="currentColor" fill="currentColor" />
              </a>
              <a
                href="https://www.instagram.com/incorbis.official?igsh=dXRhdzh5NGdlency"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={32} stroke="currentColor" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section flex-1 min-w-[180px] opacity-0 translate-y-8 transition-all duration-600 ease-in-out delay-200">
            <h3 className="text-2xl font-semibold text-[#7b00ff] mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-lg">
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                  Services
                </a>
              </li>
              <li>
                <a href="/ContactUs" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section flex-1 min-w-[180px] opacity-0 translate-y-8 transition-all duration-600 ease-in-out delay-300">
            <h3 className="text-2xl font-semibold text-[#7b00ff] mb-3">
              Services
            </h3>
            <ul className="space-y-2 text-lg">
              <li>
                <a href="/dashboard" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                  AI TimeTable
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                  AI Planner
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-2 inline-block">
                  AI Seating Planner
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section flex-1 min-w-[220px] opacity-0 translate-y-8 transition-all duration-600 ease-in-out delay-400">
            <h3 className="text-2xl font-semibold text-[#7b00ff] mb-3">
              Contact Us
            </h3>
            <p className="text-lg text-gray-300">Email: support@timelazy.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright mt-10 text-center text-gray-400 text-lg opacity-0 translate-y-4 transition-all duration-600 ease-in-out delay-500">
          <p>&copy; 2025 TIMELAZY. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        .visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .visible .footer-section:nth-child(1) {
          transition-delay: 0.1s;
        }
        
        .visible .footer-section:nth-child(2) {
          transition-delay: 0.2s;
        }
        
        .visible .footer-section:nth-child(3) {
          transition-delay: 0.3s;
        }
        
        .visible .footer-section:nth-child(4) {
          transition-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default Footer;