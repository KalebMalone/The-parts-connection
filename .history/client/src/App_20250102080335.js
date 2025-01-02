import React, { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';  
import Header from './components/navigation/Header';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const updateUser = (value) => {
    setCurrentUser(value);
    if (value) {
      localStorage.setItem('currentUser', JSON.stringify(value)); // Save to localStorage
    } else {
      localStorage.removeItem('currentUser'); // Remove from localStorage on logout
    }
  };

  return (
    <CartProvider>
      <Header currentUser={currentUser} updateUser={updateUser} />
      <Toaster />
      <Outlet context={{ currentUser, updateUser }} />
    </CartProvider>
  );
}

export default App;
