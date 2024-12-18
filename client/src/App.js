import { Outlet } from 'react-router-dom'
import Header from './components/navigation/Header'
import { Toaster } from "react-hot-toast"
import { useState, useEffect } from "react"
import React from 'react'

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    // Load currentUser from localStorage on app load
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (value) => {
    setCurrentUser(value);
    if (value) {
      localStorage.setItem("currentUser", JSON.stringify(value)); // Store updated user in localStorage
    } else {
      localStorage.removeItem("currentUser"); // Remove user from localStorage when logged out
    }
  }

  return (
    <>
      {/* <GlobalStyle /> */}
      <Header currentUser={currentUser} updateUser={updateUser} />
      <Toaster />
      <Outlet context={{ currentUser, updateUser }} />
    </>
  )
}

export default App;
