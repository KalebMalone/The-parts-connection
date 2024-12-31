import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
  const { currentUser, updateUser } = useOutletContext(); // Get currentUser from context
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const fetchOrders = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/v1/orders", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          const data = await response.json();
  
          if (response.ok) {
            if (Array.isArray(data)) {
              setOrders(data);  // Set orders only if it's an array
            } else {
              setOrders([]);  // Default to empty array if the data is not an array
              setError("Received data is not in expected format.");
            }
          } else {
            setOrders([]);
            setError(data.error || "Failed to fetch orders.");
          }
        } catch (err) {
          setOrders([]);
          setError("An error occurred while fetching orders.");
          console.error("Error fetching orders:", err);
        }
      };
      fetchOrders();
    }
  }, [currentUser]);
  

  const handleUpdate = async () => {
    setError("");

    if (name === currentUser.name && email === currentUser.email && password === "") {
      setError("No changes detected. Please update your credentials.");
      return;
    }

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    const updatedUserData = { name, email, password };
    try {
      const response = await fetch("/api/v1/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
      });

      const data = await response.json();
      if (response.ok) {
        updateUser(data);
        setName(data.name);
        setEmail(data.email);
        setPassword("");
        alert("Profile updated successfully!");
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred while updating your profile.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (confirmDelete) {
      try {
        const response = await fetch("/api/v1/delete-account", {
          method: "DELETE",
        });

        if (response.ok) {
          updateUser(null);
          alert("Profile deleted successfully!");
          navigate('/');
        } else {
          setError("Failed to delete profile.");
        }
      } catch (err) {
        setError("An error occurred while deleting your profile.");
      }
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/v1/orders/${orderId}`, {
          method: "DELETE", // DELETE method
        });

        if (response.ok) {
          // After successful deletion, update the state to remove the deleted order
          setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
          alert("Order deleted successfully!");
        } else {
          const data = await response.json();
          setError(data.error || "Failed to delete order.");
        }
      } catch (err) {
        setError("An error occurred while deleting the order.");
        console.error("Error deleting order:", err);
      }
    }
  };

  if (!currentUser) {
    return <div>Loading user information...</div>;
  }

  return (
    <ProfileContainer>
      <Title>Profile</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
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
      <Button onClick={handleDelete} danger>Delete Account</Button>
      <OrderSection>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id}>
              <OrderInfo>
                <p>Status: {order.status}</p>
                <p>Total Price: ${order.total_price}</p>
              </OrderInfo>
              <Button onClick={() => handleDeleteOrder(order.id)} danger>Delete Order</Button>
            </OrderCard>
          ))
        )}
      </OrderSection>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px;
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
  margin-top: 20px;
`;

const OrderCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
`;

const OrderInfo = styled.div`
  font-size: 1rem;
`;

export default Profile;
