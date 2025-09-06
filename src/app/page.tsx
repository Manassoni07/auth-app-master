'use client';

import { useState } from 'react';
import { Leaf, Shield, Users, Trash2, User, Mail, Lock, TreePine, Droplets, Recycle, Sparkles, Wind, Globe } from 'lucide-react';

type Role = 'Admin' | 'User' | 'Wasteworker';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
}

export default function AuthPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'User'
  });

  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleLoginMode = () => {
    setIsLogin(!isLogin);
    // Reset form data when switching modes
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'User'
    });
    setErrors({});
  };

  const roleConfigs = {
    Admin: {
      icon: Shield,
      color: 'from-emerald-600 to-green-700',
      bgPattern: 'bg-gradient-to-br from-emerald-50 to-green-100',
      description: 'System Administrator',
      features: ['Full system access', 'User management', 'Environmental reports']
    },
    User: {
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-100',
      description: 'General User',
      features: ['View reports', 'Submit requests', 'Track progress']
    },
    Wasteworker: {
      icon: Trash2,
      color: 'from-lime-600 to-green-600',
      bgPattern: 'bg-gradient-to-br from-lime-50 to-green-100',
      description: 'Waste Management Specialist',
      features: ['Collection routes', 'Vehicle tracking', 'Field reports']
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = isLogin ? 'Email or Username is required' : 'Email is required';
    } else if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isLogin && !/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setShowSuccess(true);
      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          role: 'User'
        });
      }, 2000);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const currentRole = roleConfigs[formData.role];
  const IconComponent = currentRole.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 flex items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes checkmark {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      {/* Main Rectangle Container */}
      <div className="w-full max-w-5xl min-h-[500px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-green-200 flex flex-col md:flex-row relative z-10">
        
        {/* Left Side - Visual Mission Display */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-8 left-8 text-green-200/20">
              <Recycle size={120} />
            </div>
            <div className="absolute bottom-8 right-8 text-emerald-200/20">
              <Recycle size={100} />
            </div>
          </div>

          {/* Central Visual Mission */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Simple Leaf Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-2xl flex items-center justify-center">
              <Leaf className="text-white w-12 h-12 md:w-16 md:h-16" />
            </div>

            {/* Minimal Text */}
            <div className="text-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Swachhta Saathi 
              </h1>
              <p className="text-xs md:text-sm text-gray-600 font-medium italic px-4">
                "From Waste to Wealth: A Nation's Collective Effort"
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Minimal Auth Form */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto space-y-6">
            
            {/* Minimal Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-600">
                Welcome
              </h2>
            </div>

            {/* Simple Role Toggle */}
            <div className="flex justify-center">
              <div className="flex bg-gray-100 rounded-full p-1 text-center">
                {Object.entries(roleConfigs).map(([role, config]) => {
                  const isSelected = formData.role === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleInputChange('role', role as Role)}
                      className={`px-2 md:px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        isSelected
                          ? 'bg-white text-green-700 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clean Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 text-sm border-0 border-b-2 bg-transparent focus:outline-none focus:border-green-500 transition-colors placeholder-gray-400 text-black ${
                      errors.name ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Full Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <input
                  type={isLogin ? "text" : "email"}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 text-sm border-0 border-b-2 bg-transparent focus:outline-none focus:border-green-500 transition-colors placeholder-gray-400 text-black ${
                    errors.email ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder={isLogin ? "Email or Username" : "Email Address"}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 text-sm border-0 border-b-2 bg-transparent focus:outline-none focus:border-green-500 transition-colors placeholder-gray-400 text-black ${
                    errors.password ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 text-sm border-0 border-b-2 bg-transparent focus:outline-none focus:border-green-500 transition-colors placeholder-gray-400 text-black ${
                      errors.phone ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Phone Number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 bg-gradient-to-r ${currentRole.color} mt-8`}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Simple Toggle */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={toggleLoginMode}
                className="text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                {isLogin ? 'Need an account? Sign up' : 'Have an account? Sign in'}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center transform animate-[slideIn_0.5s_ease-out]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 text-green-500 relative">
                <div className="absolute inset-0 transform animate-[checkmark_0.5s_ease-out]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path 
                      d="M20 6L9 17L4 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {isLogin ? 'Sign In' : 'Sign Up'} Successful!
            </h3>
            <p className="text-gray-600">
              Welcome {formData.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}