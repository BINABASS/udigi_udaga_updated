import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Load user data from localStorage if available
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData && userData.role) {
          setUser(userData);
          setRole(userData.role);
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUser(null);
      setRole(null);
      localStorage.removeItem('user'); // Clear invalid data
    }
  }, []);

  const login = (userData) => {
    if (!userData || !userData.role) {
      throw new Error('User data must include a role');
    }
    setUser(userData);
    setRole(userData.role);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    role,
    login,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
