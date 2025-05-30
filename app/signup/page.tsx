"use client"; // Only if using App Router

import React from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleConfirmPasswordChange = () => {
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
    } else {
      setAlertMessage("");
    }
  };

  React.useEffect(() => {
    if (confirmPassword) {
      handleConfirmPasswordChange();
    }
  }, [confirmPassword, password]);

  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions.");
      return; // Don't proceed
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/signup/", {
        username: name,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          toast("Check your email for verification");
        }, 1000); // Optional delay for user feedback
        // Assuming response.data.token contains the session token
        localStorage.setItem("token", response.data.token); // Store token
        // Redirect or update UI after signup/login
        window.location.href = "/dashboard"; // example protected page
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-md border rounded-xl overflow-hidden">
        {/* Image Section - only on md+ */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/signupbg.jpg" // Replace with actual image in /public
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

            <form
              className="w-full space-y-4 "
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Confirm password"
                  required
                  className="mt-1 w-full px-4 py-2 text-gray-700 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-red-500">{alertMessage}</span>
              </div>

              {/* Terms */}
              <div className="flex items-center text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                  }}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-indigo-600 underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing up..." : "Sign Up"}
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
                onClick={() => (window.location.href = "#")}
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
                Already have an account?{" "}
                <a href="/login" className="text-indigo-600 hover:underline">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default SignupPage;
