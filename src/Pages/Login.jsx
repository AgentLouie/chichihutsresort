import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import emailjs from '@emailjs/browser';

const handleForgotPassword = async () => {
  const email = prompt("Please enter your email to reset your password:");

  if (email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error(error);
      alert("Error sending password reset email. Please try again.");
    }
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');

  const send2FACode = async (code) => {
    try {
      await emailjs.send('service_g1sigqs', 'template_j7sd0f8', {
        to_email: email,
        code: code,
      }, 'D6X4DqAp-dcv5LAu1');
    } catch (error) {
      console.error('EmailJS error:', error);
      setError('Failed to send 2FA code. Try again later.');
    }
  };

  const [userRole, setUserRole] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDoc = await getDoc(doc(db, 'admins', user.uid));
      if (userDoc.exists()) {
        setUserRole(userDoc.data().role);
  
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        await send2FACode(code);
        setCodeSent(true);
      } else {
        setError('No user role found. Contact admin.');
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  const verify2FACode = () => {
    if (userInputCode === generatedCode) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'staff') {
        navigate('/staff');
      } else {
        setError('Unauthorized role.');
      }
    } else {
      setError('Invalid 2FA code.');
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 mt-2">
          Forgot your password?{" "}
          <button
            onClick={handleForgotPassword}
            type="button"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Click here to reset
          </button>
        </p>
      </form>

      {/* 2FA Code Input Modal */}
      {codeSent && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-center">Enter 2FA Code</h3>
            <p className="text-sm text-gray-600 mb-4 text-center">
              A 6-digit code was sent to your email. Please enter it below.
            </p>
            <input
              type="text"
              maxLength={6}
              className="w-full p-2 border rounded mb-4 text-center"
              placeholder="Enter code"
              value={userInputCode}
              onChange={(e) => setUserInputCode(e.target.value)}
            />
            <button
              onClick={verify2FACode}
              className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
            >
              Verify Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
