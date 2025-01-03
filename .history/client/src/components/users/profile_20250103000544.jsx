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
        const response = await fetch("/api/v1/orders");
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

    fetchOrders();
  }, [currentUser]);

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch("/api/v1/delete-account", {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete profile.");
      }

      sessionStorage.clear();
      localStorage.clear();
      document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

      alert("Profile deleted successfully!");
      window.location.href = "/";

    } catch (err) {
      setError(err.message || "An error occurred while deleting your profile.");
      console.error("Delete Profile Error:", err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/v1/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete order.");
      }

      setOrders(orders.filter((order) => order.id !== orderId));
      alert("Order deleted successfully!");
    } catch (err) {
      setError(err.message || "An error occurred while deleting the order.");
      console.error("Delete Order Error:", err);
    }
  };

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
        credentials: "include",
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
        <NoOrdersMessage>No orders found.</NoOrdersMessage>
      ) : (
        <OrderList>
          {orders.map((order) => (
            <OrderCard key={order.id}>
              <OrderDetails>
                <OrderText>Order ID: {order.id}</OrderText>
                <OrderText>Status: {order.status}</OrderText>
                <OrderText>Total: ${order.total_price}</OrderText>
              </OrderDetails>
              <DeleteButton onClick={() => handleDeleteOrder(order.id)}>
                Delete Order
              </DeleteButton>
            </OrderCard>
          ))}
        </OrderList>
      )}

      <DeleteProfileButton onClick={handleDeleteProfile}>
        Delete Profile
      </DeleteProfileButton>
    </ProfileContainer>
  );
};

const LoadingMessage = styled.p`
  font-size: 1.5rem;
  color: #666;
`;

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1rem;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color:rgb(64, 193, 172);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color:rgb(64, 193, 172);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(64, 193, 172);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin-top: 2rem;
  color: #333;
`;

const NoOrdersMessage = styled.p`
  font-size: 1.2rem;
  color: #777;
`;

const OrderList = styled.div`
  margin-top: 1rem;
`;

const OrderCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const OrderDetails = styled.div`
  margin-bottom: 1rem;
`;

const OrderText = styled.p`
  font-size: 1.1rem;
  color: #333;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const DeleteProfileButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background-color: darkred;
  }
`;

export default Profile;