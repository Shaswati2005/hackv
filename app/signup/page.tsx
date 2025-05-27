'use client'; // Only if using App Router

import React from 'react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-md border rounded-xl overflow-hidden">
        
        {/* Image Section - only on md+ */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/signup-placeholder.jpg" // Replace with actual image in /public
            alt="Legal workflow"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome to <span className="text-indigo-600">LegalFlow</span>
              </h1>
              <p className="text-sm text-gray-500">Create your account</p>
            </div>

            <form className="w-full space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Terms */}
              <div className="flex items-center text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-gray-600">
                  I agree to the <a href="#" className="text-indigo-600 underline">Terms and Conditions</a>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200"
              >
                Sign Up
              </button>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Google Sign Up */}
              <button
                type="button"
                onClick={() => window.location.href = "#"}
                className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account? <a href="#" className="text-indigo-600 hover:underline">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
