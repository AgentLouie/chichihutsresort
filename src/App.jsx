import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Rooms from './Pages/Rooms';
import Contact from './pages/Contact';
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import StaffDashboard from './Pages/StaffDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { auth, checkUserRole } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const protectedPaths = ["/admin", "/staff"];
      const currentPath = window.location.pathname;

      if (user) {
        const role = await checkUserRole(user.uid);
        // Only redirect if trying to access protected paths
        if (protectedPaths.includes(currentPath)) {
          if (role === "staff" && currentPath === "/admin") {
            navigate("/staff");
          } else if (role === "admin" && currentPath === "/staff") {
            navigate("/admin");
          }
        }
      } else {
        // Only redirect to login if trying to access protected paths
        if (protectedPaths.includes(currentPath)) {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const hideHeaderFooter = location.pathname === "/login" || 
                         location.pathname === "/admin" || 
                         location.pathname === "/staff";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
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
        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
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