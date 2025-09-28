import React, { useState } from 'react';

const Loginad = () => {
  // Mock navigate function for demo
  const navigate = (path) => console.log(`Navigating to: ${path}`);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // Note: In a real implementation, you would uncomment the API call below
      // and remove the mock response
      
      // const response = await fetch("http://localhost:5000/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password
      //   })
      // });
      // const data = await response.json();
      
      // Mock successful login for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockSuccess = true;
      
      if (mockSuccess) {
        // In real implementation:
        // localStorage.setItem("user", JSON.stringify(data.user));
        // localStorage.setItem("token", data.token);
        console.log("Login successful!");
        navigate('/admindash');
      } else {
        setErrors({ submit: "Login failed" });
      }
    } catch (error) {
      setErrors({ submit: "Server error. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-5 font-sans">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 w-full max-w-lg border border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-3xl relative">
        {/* Back Button */}
        <button 
          className="absolute top-5 left-5 bg-purple-300/80 border-none w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-sm hover:bg-white hover:transform hover:-translate-x-0.5"
          onClick={() => navigate('/landing')}
        >
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-15">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Admin Login</h1>
          <p className="text-gray-500 text-lg font-normal">Access your organization dashboard</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-7">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-600 text-base tracking-wide">
              Email Address
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full py-4 px-4 pr-12 border-2 rounded-xl text-base bg-white transition-all duration-300 text-gray-800 font-inherit placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-100 focus:transform focus:-translate-y-0.5 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 ${
                  errors.email ? 'border-red-500 shadow-lg shadow-red-100' : 'border-gray-200'
                }`}
                placeholder="admin@organization.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm font-medium mt-1">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-600 text-base tracking-wide">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full py-4 px-4 pr-12 border-2 rounded-xl text-base bg-white transition-all duration-300 text-gray-800 font-inherit placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-100 focus:transform focus:-translate-y-0.5 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 ${
                  errors.password ? 'border-red-500 shadow-lg shadow-red-100' : 'border-gray-200'
                }`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-4 bg-transparent border-none cursor-pointer p-1 rounded w-6 h-6 text-gray-400 transition-colors duration-200 flex items-center justify-center hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <span className="text-lg">{showPassword ? '🙈' : '👁️'}</span>
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-sm font-medium mt-1">{errors.password}</span>}
          </div>

          {/* Form Options */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 font-medium relative">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="opacity-0 absolute w-0 h-0"
                disabled={isLoading}
              />
              <span className={`relative w-5 h-5 border-2 rounded bg-white transition-all duration-300 flex items-center justify-center ${
                formData.rememberMe ? 'bg-indigo-500 border-indigo-500' : 'border-gray-200'
              }`}>
                {formData.rememberMe && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              Remember me
            </label>
            <a href="/forgot-password" className="text-indigo-500 no-underline text-sm font-semibold transition-colors duration-200 hover:text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-100 text-red-700 py-3 px-4 rounded-lg text-sm font-medium border border-red-200 text-center">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none py-4 px-6 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 min-h-14 font-inherit hover:transform hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-300 active:transform active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 ${
              isLoading ? 'cursor-wait' : ''
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-9 pt-6 border-t border-gray-200">
          <p className="m-0 text-gray-500 text-sm">
            Don't have an account?{' '}
            <a href="/signupad" className="text-indigo-500 no-underline font-semibold transition-colors duration-200 hover:text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 480px) {
          .min-h-screen {
            padding: 1rem;
          }
          .p-10 {
            padding: 1.75rem;
          }
          .text-3xl {
            font-size: 1.625rem;
          }
          .justify-between {
            flex-direction: column;
            align-items: flex-start;
          }
          .gap-4 {
            gap: 0.75rem;
          }
          .text-base {
            font-size: 1rem;
          }
        }
        @media (max-width: 360px) {
          .p-10 {
            padding: 1.375rem;
          }
          .gap-7 {
            gap: 1.375rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Loginad;