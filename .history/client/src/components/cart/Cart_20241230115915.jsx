import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import styled from 'styled-components';

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
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty!');
      return;
    }

    // Construct the orderData object with the required fields
    const orderData = {
      items: cartItems.map((item) => ({
        product_id: item.id,  // Ensure product_id is present
        quantity: item.quantity,  // Ensure quantity is present
        price_per_item: item.price,  // Ensure price_per_item is present
        total_price: item.price * item.quantity,  // Ensure total_price is calculated correctly
      })),
      total_price: totalPrice,  // Ensure total_price is correctly passed
    };

    console.log('Order Data:', orderData);  // Log the order data to debug

    try {
      const response = await fetch('/api/v1/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),  // Ensure the order data is correctly stringified
      });

      const data = await response.json();
      console.log('Backend Response:', data);  // Log the response to debug

      if (response.ok) {
        clearCart();
        setSuccess(true);  // Set success to true to show the success message
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
      {success && <p style={{ color: 'green' }}>Order created successfully!</p>}
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
