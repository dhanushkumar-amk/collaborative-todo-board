// ---- AppContext.jsx ----
import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  const url = 'http://localhost:5000/';

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (token && user) {
      const newSocket = io(url, { query: { token } });
      newSocket.emit('join', { id: user.id, name: user.name });
      setSocket(newSocket);
      return () => newSocket.disconnect();
    }
  }, [token, user]);

  return (
    <AppContext.Provider value={{ token, user, url, socket }}>
      {children}
    </AppContext.Provider>
  );
};
