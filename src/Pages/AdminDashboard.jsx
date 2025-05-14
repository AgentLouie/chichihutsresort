import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiCheck, FiX, FiCalendar, FiUser, FiPhone, FiMail, FiUsers, FiMessageSquare, FiFilter } from 'react-icons/fi';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const filteredBookings = bookings.filter(booking => {
  // Apply status filter
  if (filter !== 'all') {
    if (filter === 'pending') {
      if (booking.status && booking.status.toLowerCase() !== 'pending') return false;
    } else {
      if (booking.status?.toLowerCase() !== filter) return false;
    }
  }
  
  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    return (
      booking.name?.toLowerCase().includes(term) ||
      booking.email?.toLowerCase().includes(term) ||
      booking.mobile?.toLowerCase().includes(term) ||
      booking.roomType?.toLowerCase().includes(term)
    );
  }
  return true;
  });

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter(b => !b.status || b.status.toLowerCase() === 'pending').length,
    accepted: bookings.filter(b => b.status?.toLowerCase() === 'accepted').length,
    rejected: bookings.filter(b => b.status?.toLowerCase() === 'rejected').length,
  };

  // Native JavaScript date formatting
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString; // Return raw string if date parsing fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-orange-500">Admin</span> Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Bookings" 
            value={statusCounts.all} 
            icon={<FiCalendar className="text-orange-500" />} 
            bgColor="bg-orange-50"
          />
          <StatCard 
            title="Pending" 
            value={statusCounts.pending} 
            icon={<FiCalendar className="text-yellow-500" />} 
            bgColor="bg-yellow-50"
          />
          <StatCard 
            title="Accepted" 
            value={statusCounts.accepted} 
            icon={<FiCheck className="text-green-500" />} 
            bgColor="bg-green-50"
          />
          <StatCard 
            title="Rejected" 
            value={statusCounts.rejected} 
            icon={<FiX className="text-red-500" />} 
            bgColor="bg-red-50"
          />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-3 py-1 rounded-md ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('accepted')}
                  className={`px-3 py-1 rounded-md ${filter === 'accepted' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  Accepted
                </button>
                <button
                  onClick={() => setFilter('rejected')}
                  className={`px-3 py-1 rounded-md ${filter === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No bookings found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader icon={<FiUser />} text="Name" />
                    <TableHeader icon={<FiMail />} text="Email" />
                    <TableHeader icon={<FiPhone />} text="Mobile" />
                    <TableHeader text="Room Type" />
                    <TableHeader icon={<FiUsers />} text="Guests" />
                    <TableHeader icon={<FiCalendar />} text="Check In" />
                    <TableHeader icon={<FiCalendar />} text="Check Out" />
                    <TableHeader icon={<FiMessageSquare />} text="Message" />
                    <TableHeader text="Status" />
                    <TableHeader text="Actions" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.roomType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.numberOfPeople}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(booking.checkInDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(booking.checkOutDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {booking.message || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'accepted')}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                            disabled={booking.status === 'accepted'}
                          >
                            <FiCheck />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                            disabled={booking.status === 'rejected'}
                          >
                            <FiX />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Helper Components (same as before)
const StatCard = ({ title, value, icon, bgColor }) => (
  <div className={`${bgColor} p-4 rounded-lg shadow`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-white">
        {icon}
      </div>
    </div>
  </div>
);

const TableHeader = ({ icon, text }) => (
  <th
    scope="col"
    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    <div className="flex items-center gap-1">
      {icon && <span className="text-gray-400">{icon}</span>}
      {text}
    </div>
  </th>
);

const StatusBadge = ({ status }) => {
  const statusMap = {
    accepted: { color: 'green', text: 'Accepted' },
    rejected: { color: 'red', text: 'Rejected' },
    pending: { color: 'yellow', text: 'Pending' },
  };

  const currentStatus = statusMap[status] || { color: 'yellow', text: 'Pending' };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${currentStatus.color}-100 text-${currentStatus.color}-800`}>
      {currentStatus.text}
    </span>
  );
};

export default AdminDashboard;