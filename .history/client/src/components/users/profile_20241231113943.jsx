import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
  const { currentUser, updateUser } = useOutletContext();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        setError("User is not logged in.");
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/orders", { // Correct URL here
          method: "GET",
          credentials: "include", // Ensure credentials (cookies) are sent
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch orders.");
        }
  
        const data = await response.json();
        debugger
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || "An error occurred while fetching orders.");
        console.error("Fetch Orders Error:", err);
      }
    };
  
    fetchOrders();
  }, [currentUser]);
  
  console.log("orders", orders)
  // Update profile logic
  const handleUpdate = async () => {
    setError("");

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    try {
      const response = await fetch("/api/v1/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include", // Ensure cookies are sent
      });

      const data = await response.json();
      if (response.ok) {
        updateUser(data);
        setPassword("");
        alert("Profile updated successfully!");
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred while updating your profile.");
    }
  };

  if (!currentUser) {
    return <LoadingMessage>Loading user information...</LoadingMessage>;
  }

  return (
    <ProfileContainer>
      <Title>Profile</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Update Profile</Button>
      </Form>

      <SectionTitle>Orders</SectionTitle>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <OrderList>
          {orders.map((order) => (
            <OrderCard key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total_price}</p>
            </OrderCard>
          ))}
        </OrderList>
      )}
    </ProfileContainer>
  );
};

const LoadingMessage = styled.p`
  font-size: 1.5rem;
  color: #666;
`;

const ProfileContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 1rem 0;
  padding: 0.8rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-top: 2rem;
`;

const OrderList = styled.div`
  margin-top: 1rem;
`;

const OrderCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export default Profile;
