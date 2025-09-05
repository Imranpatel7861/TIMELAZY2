import React, { useState } from 'react';

// Icon components as SVGs since we can't import external libraries
const MapPinIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EnvelopeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PaperAirplaneIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const SpinnerIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.148-1.193L3.17 18.926l3.06-2.14c.699-.703 1.851-1.193 3.148-1.193s2.448.49 3.148 1.193l3.061 2.14-2.131-3.131c-.7.703-1.851 1.193-3.148 1.193z"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      name: false,
      email: false,
      subject: false,
      message: false
    });

    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = true;
      valid = false;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = true;
      valid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = true;
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = true;
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    // Navigate back functionality would go here
    console.log('Navigate back to Landing');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden relative">
      {/* Back Button */}
      <button 
        onClick={handleBack} 
        className="absolute top-5 left-16  z-50 
                    bg-transparent text-indigo-600 text-3xl 
                    hover:text-indigo-800 transition-all duration-300 
                    hover:-translate-y-1 border-none cursor-pointer"
        >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>


      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-indigo-600 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-[15%] right-[10%] w-36 h-36 bg-pink-500 rounded-full opacity-10 animate-float-delayed"></div>
        <div className="absolute top-[60%] left-[30%] w-24 h-24 bg-indigo-800 rounded-full opacity-10 animate-float-delayed-2"></div>
        <div className="absolute top-[20%] right-[20%] w-20 h-20 bg-pink-500 rounded-full opacity-10 animate-float-delayed-3"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <header className="text-center mb-12 opacity-0 -translate-y-5 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-indigo-600 relative inline-block">
            Contact Us
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-pink-500 rounded"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
          </p>
        </header>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          {/* Contact Info */}
          <div className="flex-1 min-w-0 max-w-md mx-auto lg:mx-0 opacity-0 -translate-x-5 animate-fade-in-left">
            <h2 className="text-3xl font-bold mb-6 text-indigo-800">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">Our Location</h3>
                  <p className="text-gray-600">TimeLazy, Pune, India</p>
                </div>
              </div>

              <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">Phone Number</h3>
                  <p className="text-gray-600">7558278187</p>
                </div>
              </div>

              <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <EnvelopeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">Email Address</h3>
                  <p className="text-gray-600">support@timelazy.com</p>
                </div>
              </div>

              <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <ClockIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">Working Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <a 
                href="https://www.facebook.com/profile.php?id=61570261174985&mibextid=ZbWKwL" 
                className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-1 transition-all duration-300"
                title="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/incorbis?t=yRcNnKknmtATHWpOXWnA6w&s=09" 
                className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-1 transition-all duration-300"
                title="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/incorbis.official?igsh=dXRhdzh5NGdlency" 
                className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-1 transition-all duration-300"
                title="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-800 hover:-translate-y-1 transition-all duration-300"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 min-w-0 max-w-lg mx-auto lg:mx-0 opacity-0 translate-x-5 animate-fade-in-right">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              {submitSuccess && (
                <div className="bg-green-500 text-white p-4 rounded-lg mb-6 text-center animate-fade-in">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <div className="space-y-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-base transition-all duration-300 hover:bg-white hover:border-indigo-600 hover:shadow-lg focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">Please enter your name</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-base transition-all duration-300 hover:bg-white hover:border-indigo-600 hover:shadow-lg focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-20 py-3 bg-gray-50 border rounded-lg text-base transition-all duration-300 hover:bg-white hover:border-indigo-600 hover:shadow-lg focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">Please enter a subject</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-base transition-all duration-300 hover:bg-white hover:border-indigo-600 hover:shadow-lg focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-none resize-y min-h-[150px] ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">Please enter your message</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-base transition-all duration-300 hover:bg-indigo-800 hover:-translate-y-1 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center relative overflow-hidden group border-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerIcon className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message 
                      <PaperAirplaneIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s forwards 0.3s;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s forwards 0.5s;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s forwards 0.5s;
        }

        .animate-fade-in {
          animation: fade-in 0.5s;
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-float-delayed {
          animation: float 15s infinite linear 2s;
        }

        .animate-float-delayed-2 {
          animation: float 15s infinite linear 4s;
        }

        .animate-float-delayed-3 {
          animation: float 15s infinite linear 6s;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;