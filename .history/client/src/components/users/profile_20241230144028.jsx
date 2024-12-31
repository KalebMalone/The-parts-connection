import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
  const { currentUser, updateUser } = useOutletContext();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/orders", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || "An error occurred while fetching orders.");
        console.error("Fetch Orders Error:", err);
      }
    };

    if (currentUser) {
      fetchOrders();
    } else {
      setError("User is not logged in.");
    }
  }, [currentUser]);

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
      <OrderSection>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id}>
              <OrderInfo>
                <p>Status: {order.status}</p>
                <p>Total Price: ${order.total_price.toFixed(2)}</p>
              </OrderInfo>
            </OrderCard>
          ))
        )}
      </OrderSection>
    </ProfileContainer>
  );
};

// Styled components remain the same
export default Profile;


const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const LoadingMessage = styled.div`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 12px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.danger ? "#dc3545" : "#007bff")};
  color: white;
  border: none;
  &:hover {
    background-color: ${(props) => (props.danger ? "#c82333" : "#0056b3")};
  }
`;

const OrderSection = styled.div`
  margin-top: 40px;
`;

const OrderCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const OrderInfo = styled.div`
  font-size: 1rem;
  color: #555;
`;

export default Profile;
