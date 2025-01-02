import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';  
import Header from './components/navigation/Header';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState()

  const updateUser = (value) => {
    console.log(value)
    setCurrentUser(value);
    if (value) {
      localStorage.setItem('currentUser', JSON.stringify(value));
    } else {
      localStorage.removeItem('currentUser');
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