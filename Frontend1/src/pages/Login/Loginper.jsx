import React, { useState } from 'react';

const LoginPer = () => {
  // Mock navigate function for demo
  const navigate = (path) => console.log(`Navigating to: ${path}`);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Note: In a real implementation, you would uncomment the API call below
      // and remove the mock response
      
      // const res = await fetch('http://localhost:5000/api/personal/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify(formData)
      // });
      // const data = await res.json();

      // Mock successful login for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockSuccess = true;

      if (mockSuccess) {
        console.log('✅ Personal Login Successful');
        navigate('/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('Server error. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/Landing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-5 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-75 h-75 -top-37 -left-37 rounded-full bg-white/10 animate-float"></div>
        <div className="absolute w-50 h-50 top-1/2 -right-25 rounded-full bg-white/10 animate-float-delayed"></div>
        <div className="absolute w-37 h-37 -bottom-18 left-1/3 rounded-full bg-white/10 animate-float-delayed-2"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-10 w-full max-w-lg shadow-2xl relative z-10 animate-slide-up border border-white/20">
        {/* Back Button */}
        <button 
          className="absolute top-5 left-5 bg-purple-300/80 backdrop-blur-sm border-none rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 z-20 shadow-lg hover:bg-white hover:-translate-y-0.5 hover:shadow-xl"
          onClick={handleBack}
        >
          <svg className="w-5 h-5 text-gray-600" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-5 text-white animate-pulse-custom">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
              <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in-down">Welcome Back</h1>
          <p className="text-gray-500 text-base animate-fade-in-down-delayed">Log in to your personal account</p>
        </div>

        {/* Form */}
        <div className="animate-fade-in-up">
          <div className="mb-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full py-4 pl-12 pr-5 border-2 border-gray-200 rounded-xl text-base bg-white transition-all duration-300 outline-none box-border focus:border-indigo-500 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-indigo-100 placeholder-gray-400"
                required
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full py-4 pl-12 pr-12 border-2 border-gray-200 rounded-xl text-base bg-white transition-all duration-300 outline-none box-border focus:border-indigo-500 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-indigo-100 placeholder-gray-400"
                required
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="16" r="1" fill="currentColor"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer p-1 rounded w-8 h-8 transition-all duration-300 flex items-center justify-center hover:text-indigo-500 hover:bg-indigo-50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94L17.94 17.94z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19L9.9 4.24z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 animate-fade-in-up-delayed">
            <label className="flex items-center cursor-pointer text-sm text-gray-600">
              <input type="checkbox" className="hidden" />
              <span className="w-4 h-4 border-2 border-gray-200 rounded mr-2 relative transition-all duration-300 flex items-center justify-center">
                {/* Custom checkbox styling handled via CSS */}
              </span>
              Remember me
            </label>
            <a href="#" className="text-indigo-500 no-underline text-sm font-medium transition-colors duration-300 hover:text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            className={`w-full py-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden animate-fade-in-up-delayed-2 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300 active:translate-y-0 ${isLoading ? 'pointer-events-none' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            ) : (
              'Log In'
            )}
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 hover:left-full"></span>
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 text-center relative animate-fade-in-up-delayed-3">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
          <span className="bg-white/95 px-5 text-gray-500 text-sm relative z-10">Or continue with</span>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3 mb-6 animate-fade-in-up-delayed-4">
          <button className="flex-1 py-3 border-2 border-gray-200 bg-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-gray-600 cursor-pointer transition-all duration-300 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-md">
            Google
          </button>
          <button className="flex-1 py-3 border-2 border-gray-200 bg-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-gray-600 cursor-pointer transition-all duration-300 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-md">
            Facebook
          </button>
        </div>

        {/* Footer */}
        <div className="text-center animate-fade-in-up-delayed-5">
          <p className="m-0 text-gray-500 text-sm">
            Don't have an account?{' '}
            <a href="/SignupPer" className="text-indigo-500 no-underline font-semibold transition-colors duration-300 hover:text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Custom CSS for animations and special effects */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-custom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
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
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
        
        .animate-float-delayed-2 {
          animation: float 6s ease-in-out infinite 4s;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-down-delayed {
          animation: fade-in-down 0.8s ease-out 0.4s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.6s both;
        }
        
        .animate-fade-in-up-delayed {
          animation: fade-in-up 0.8s ease-out 0.8s both;
        }
        
        .animate-fade-in-up-delayed-2 {
          animation: fade-in-up 0.8s ease-out 1s both;
        }
        
        .animate-fade-in-up-delayed-3 {
          animation: fade-in-up 0.8s ease-out 1.2s both;
        }
        
        .animate-fade-in-up-delayed-4 {
          animation: fade-in-up 0.8s ease-out 1.4s both;
        }
        
        .animate-fade-in-up-delayed-5 {
          animation: fade-in-up 0.8s ease-out 1.6s both;
        }

        /* Custom checkbox styling */
        input[type="checkbox"]:checked + span {
          background: #667eea;
          border-color: #667eea;
        }
        
        input[type="checkbox"]:checked + span::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 3px;
          height: 6px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .min-h-screen {
            padding: 15px;
          }
          .p-10 {
            padding: 30px 20px;
          }
          .rounded-3xl {
            border-radius: 20px;
          }
          .text-3xl {
            font-size: 24px;
          }
          .flex.gap-3 {
            flex-direction: column;
          }
          .justify-between {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }

        /* Utility classes for custom dimensions */
        .w-75 { width: 300px; }
        .h-75 { height: 300px; }
        .w-50 { width: 200px; }
        .h-50 { height: 200px; }
        .w-37 { width: 150px; }
        .h-37 { height: 150px; }
        .-top-37 { top: -150px; }
        .-left-37 { left: -150px; }
        .-right-25 { right: -100px; }
        .-bottom-18 { bottom: -75px; }
      `}</style>
    </div>
  );
};

export default LoginPer;