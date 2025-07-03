// App.jsx
import { useContext, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import TodoPage from './pages/TodoPage';
import AuthLogin from './components/AuthLogin';
import { Toaster } from 'react-hot-toast';
import { AppContext } from './context/AppContext';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogoutAndRedirect}
      />

      {showLogin && <AuthLogin onClose={() => setShowLogin(false)} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/todoListPage" element={<TodoPage />} />
      </Routes>
    </>
  );
}
