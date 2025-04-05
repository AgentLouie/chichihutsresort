import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Rooms from './Pages/Rooms';
import Contact from './Pages/Contact';
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from './components/ProtectedRoute';

function AppWrapper() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/admin";

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
