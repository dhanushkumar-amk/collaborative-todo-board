// src/context/AppContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Your custom axios instance

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);

  // ✅ Login/Register
  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
    setToken(token);
  };

  // 🔓 Logout
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken('');
    setTasks([]);
    setLogs([]);
  };

  // 🔐 Verify token after refresh
useEffect(() => {
  const verifyToken = async () => {
    if (!token) return;
    try {
      const { data } = await api.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data?.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error('❌ Token verification failed:', err);
      logout(); // Auto logout on token error
    }
  };

  verifyToken();
}, []); // Run only once on initial mount


  return (
    <AppContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        tasks,
        setTasks,
        logs,
        setLogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
