import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const CartTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const CartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  max-width: 800px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
`;

const CartItemName = styled.div`
  font-size: 1.2rem;
  color: #333;
`;

const CartItemPrice = styled.div`
  font-size: 1.2rem;
  color: #007bff;
`;

const CartItemQuantity = styled.div`
  font-size: 1.2rem;
  color: #555;
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
`;

const CheckoutButton = styled.button`
  padding: 12px 30px;
  font-size: 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #218838;
  }
`;

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty!');
      return;
    }
  
    // Calculate the total price by summing up the price of all items in the cart
    const calculatedTotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    // Prepare the order data to send to the backend
    const orderData = {
      items: cartItems.map(item => ({
        product_id: item.id,   // Make sure to use the correct field name for product ID
        quantity: item.quantity,
        price: item.price,
        product_name: item.name,  // Include product name if required by the backend
      })),
      total_price: calculatedTotalPrice, // Include total price
    };
  
    try {
      const response = await fetch('/api/v1/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        clearCart(); // Clear the cart after successful order creation
        navigate('/thank-you'); // Redirect to the thank you page or profile
      } else {
        setError(data.error || 'Order creation failed.');
      }
    } catch (err) {
      setError('An error occurred while processing your order.');
      console.error(err);
    }
  };
  

  useEffect(() => {
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
    }
  }, [cartItems]);

  return (
    <CartContainer>
      <CartTitle>Your Cart</CartTitle>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartCard key={item.id}>
              <CartItem>
                <CartItemName>{item.name}</CartItemName>
                <CartItemQuantity>Qty: {item.quantity}</CartItemQuantity>
                <CartItemPrice>${item.price}</CartItemPrice>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </CartItem>
            </CartCard>
          ))}
          <TotalPrice>Total: ${totalPrice}</TotalPrice>
          <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
        </div>
      )}
    </CartContainer>
  );
};

export default Cart;
