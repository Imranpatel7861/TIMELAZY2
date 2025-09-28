import React, { useState } from 'react';

const SignupPer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Mock navigate function for demonstration
  const navigate = (path) => {
    console.log('Navigate to:', path);
    // In actual implementation, you would use react-router-dom's useNavigate
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/personal/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        setSignupSuccess(true);
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Server error');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 -top-36 -left-36 sm:-top-40 sm:-left-40 lg:-top-48 lg:-left-48 rounded-full bg-white/10 animate-pulse"></div>
        <div className="absolute w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 top-1/5 -right-24 sm:-right-28 lg:-right-32 rounded-full bg-white/10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 -bottom-18 left-1/5 rounded-full bg-white/10 animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 top-3/5 -left-12 sm:-left-14 lg:-left-16 rounded-full bg-white/10 animate-pulse" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-lg sm:max-w-xl lg:max-w-2xl shadow-2xl relative z-10 animate-fadeIn border border-white/20">
        
        {signupSuccess ? (
          /* Success Message */
          <div className="text-center py-8 sm:py-12 animate-fadeIn">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
              ✅ Signup Successful
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mb-6">
              You can now login to your account.
            </p>
            <button 
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => navigate('/loginPer')}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            {/* Back Button */}
            <button 
              className="absolute top-4 left-4 sm:top-5 sm:left-5 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-xl sm:text-2xl cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1"
              onClick={handleBackToLanding}
            >
              ←
            </button>

            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              {/* Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white text-2xl sm:text-3xl animate-bounce">
                👤
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                Create Account
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Join us and start your journey
              </p>

              {/* Progress Bar */}
              <div className="flex items-center justify-center mt-6 sm:mt-8 mb-6">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base mb-1 sm:mb-2 transition-all duration-300 ${
                    currentStep >= 1 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-110' 
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    1
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${
                    currentStep >= 1 ? 'text-indigo-600' : 'text-slate-400'
                  }`}>
                    Personal Info
                  </span>
                </div>

                {/* Progress Line */}
                <div className="w-16 sm:w-20 h-1 bg-slate-200 mx-4 sm:mx-6 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ${
                    currentStep >= 2 ? 'w-full' : 'w-0'
                  }`}></div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base mb-1 sm:mb-2 transition-all duration-300 ${
                    currentStep >= 2 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-110' 
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    2
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${
                    currentStep >= 2 ? 'text-indigo-600' : 'text-slate-400'
                  }`}>
                    Security
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="w-full" onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6 animate-slideIn">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 border-2 border-slate-200 rounded-xl text-base bg-white focus:outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 transition-all duration-300"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 border-2 border-slate-200 rounded-xl text-base bg-white focus:outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 sm:py-4 border-2 border-slate-200 rounded-xl text-base bg-white focus:outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 transition-all duration-300"
                    required
                  />

                  {/* Next Button */}
                  <button 
                    type="button" 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/25 mt-4 sm:mt-6"
                    onClick={handleNextStep}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6 animate-slideIn">
                  {/* Password Fields */}
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 pr-12 border-2 border-slate-200 rounded-xl text-base bg-white focus:outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-500 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 pr-12 border-2 border-slate-200 rounded-xl text-base bg-white focus:outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-500 transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>

                  {/* Terms Checkbox */}
                  <label className="flex items-start gap-3 text-sm sm:text-base text-indigo-600 cursor-pointer">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="sr-only"
                        required
                      />
                      <div className={`w-5 h-5 border-2 rounded transition-all duration-300 flex items-center justify-center ${
                        formData.agreeToTerms 
                          ? 'bg-indigo-500 border-indigo-500' 
                          : 'bg-white border-slate-300'
                      }`}>
                        {formData.agreeToTerms && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    I agree to the Terms & Privacy Policy
                  </label>

                  {/* Button Group */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                    <button 
                      type="button" 
                      className="flex-1 bg-white text-slate-700 py-3 sm:py-4 px-6 border-2 border-slate-200 rounded-xl font-semibold transition-all duration-300 hover:border-indigo-500 hover:-translate-y-1"
                      onClick={handlePrevStep}
                    >
                      ← Back
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 sm:flex-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="relative my-6 sm:my-8 text-center text-slate-400 text-sm">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative bg-white px-4">
                Or sign up with
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button className="w-full py-3 px-4 border-2 border-slate-200 rounded-xl text-slate-700 font-medium bg-white hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300">
                Google
              </button>
              <button className="w-full py-3 px-4 border-2 border-slate-200 rounded-xl text-slate-700 font-medium bg-white hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300">
                Facebook
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SignupPer;