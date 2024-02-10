import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const LoginSignupPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Welcome to IELTS Appeal</h2>
        
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center mb-4">
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center">
          <FaGoogle className="mr-2" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default LoginSignupPage;
