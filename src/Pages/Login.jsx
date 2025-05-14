import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import emailjs from '@emailjs/browser';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  const [loading, setLoading] = useState(false);

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

  const send2FACode = async (email, code) => {
    try {
      await emailjs.send(
        'service_g1sigqs', 
        'template_j7sd0f8', 
        {
          to_email: email,
          code: code,
        }, 
        'D6X4DqAp-dcv5LAu1'
      );
      console.log('2FA Code sent successfully!');
    } catch (error) {
      console.error('EmailJS error:', error);
      throw new Error('Failed to send 2FA code. Try again later.');
    }
  };

  const handle2FAVerification = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First show 2FA modal and send code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      await send2FACode(email, code);
      setCodeSent(true);
    } catch (err) {
      console.error('2FA error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyAndLogin = async () => {
    if (userInputCode !== generatedCode) {
      setError('Invalid 2FA code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Only attempt login after 2FA is verified
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check user role
      const userDoc = await getDoc(doc(db, 'admins', user.uid));
      if (!userDoc.exists()) {
        throw new Error('No user role found. Contact admin.');
      }

      const role = userDoc.data().role;
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'staff') {
        navigate('/staff');
      } else {
        throw new Error('Unauthorized role.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message.includes('auth/') 
        ? 'Invalid email or password' 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handle2FAVerification}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 disabled:bg-orange-300"
          disabled={loading}
        >
          {loading ? 'Sending 2FA Code...' : 'Continue to 2FA'}
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-center">Enter 2FA Code</h3>
            <p className="text-sm text-gray-600 mb-4 text-center">
              A 6-digit code was sent to {email}
            </p>
            
            <input
              type="text"
              maxLength={6}
              className="w-full p-2 border rounded mb-4 text-center text-lg font-mono"
              placeholder="123456"
              value={userInputCode}
              onChange={(e) => setUserInputCode(e.target.value.replace(/\D/g, ''))}
              autoFocus
            />
            
            <button
              onClick={verifyAndLogin}
              className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
            >
              {loading ? 'Verifying...' : 'Verify and Login'}
            </button>
            
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;