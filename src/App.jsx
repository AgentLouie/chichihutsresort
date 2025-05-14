import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Rooms from './Pages/Rooms';
import Contact from './pages/Contact';
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import StaffDashboard from './Pages/StaffDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';// Assuming you created this function to check role

function AppWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await checkUserRole(user.uid);
        if (role === "staff") {
          navigate("/staff");
        } else if (role === "admin") {
          navigate("/admin");
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/admin" || location.pathname === "/staff";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/staff" element={
          <ProtectedRoute>
            <StaffDashboard />
          </ProtectedRoute>
        } />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
