import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  position: sticky; /* Make the navbar sticky */
  top: 0; /* Stick it to the top of the page */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: linear-gradient(45deg, rgb(0, 0, 0), rgb(64, 193, 172)); /* Gradient background */
  color: white;
  z-index: 1000; /* Ensure the navbar stays on top of other content */
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); /* Add a bolder shadow */
  transition: background 0.3s ease-in-out; /* Smooth transition for background */
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  text-transform: uppercase;

  &:hover {
    color: rgb(64, 193, 172); /* Change color on hover */
    transform: scale(1.1); /* Slight zoom effect */
    transition: transform 0.3s ease, color 0.3s ease;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const Icon = styled(Link)`
  font-size: 1.8rem;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  text-decoration: none;
  color: white;

  &:hover {
    color: #ffeb3b; /* Icon color change on hover */
    transform: scale(1.2); /* Slight zoom effect */
  }
`;

const SearchBar = styled.input`
  padding: 10px 15px;
  font-size: 1.1rem;
  border-radius: 50px;
  border: 1px solid #ccc;
  width: 250px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;

  &:focus {
    border-color: #ffeb3b; /* Focus border color */
    box-shadow: 0 0 5px rgba(255, 235, 59, 0.7); /* Glow effect on focus */
  }
`;

const LogoutButton = styled.button`
  padding: 8px 15px; /* Reduced padding */
  font-size: 1rem; /* Slightly smaller font size */
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #c0392b;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const Header = ({ currentUser, updateUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    updateUser(null); // Update the parent component to reflect the logged-out state
    navigate('/'); // Redirect to homepage or login page
  };

  const handleProfileClick = () => {
    if (currentUser) {
      navigate('/profile'); // Navigate to profile if user is logged in
    } else {
      navigate('/signup'); // Redirect to signup page if user is not logged in
    }
  };

  return (
    <Navbar>
      <Logo to="/">German Auto</Logo>
      <NavLinks>
        <SearchBar
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Icon to="/cart">🛒</Icon> {/* Link for cart */}
        <Icon as="div" onClick={handleProfileClick}>👤</Icon> {/* Clickable profile */}
        {currentUser && <LogoutButton onClick={handleLogout}>Logout</LogoutButton>} {/* Display logout button only if user is logged in */}
      </NavLinks>
    </Navbar>
  );
};


export default Header;
