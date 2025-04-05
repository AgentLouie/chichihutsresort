// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    const bookingRef = doc(db, 'bookings', id);
    await updateDoc(bookingRef, { status: newStatus });
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const getStatusStyle = (status) => {
    if (status === 'accepted') return 'text-green-600 font-semibold';
    if (status === 'rejected') return 'text-red-500 font-semibold';
    return 'text-yellow-500 font-semibold';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border">
          <thead className="bg-orange-400">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Room Type</th>
              <th className="border p-2"># People</th>
              <th className="border p-2">Check In</th>
              <th className="border p-2">Check Out</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="text-sm">
                <td className="border p-2">{b.name}</td>
                <td className="border p-2">{b.email}</td>
                <td className="border p-2">{b.mobile}</td>
                <td className="border p-2">{b.roomType}</td>
                <td className="border p-2">{b.numberOfPeople}</td>
                <td className="border p-2">{b.checkInDate}</td>
                <td className="border p-2">{b.checkOutDate}</td>
                <td className="border p-2">{b.message}</td>
                <td className={`border p-2 ${getStatusStyle(b.status)}`}>
                  {b.status ? b.status.toUpperCase() : 'PENDING'}
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(b.id, 'accepted')}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(b.id, 'rejected')}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default AdminDashboard;
