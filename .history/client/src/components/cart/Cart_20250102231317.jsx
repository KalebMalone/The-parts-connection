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
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  display: flex;
  flex-direction: column;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
`;

const CartItemName = styled.div`
  font-size: 1.2rem;
  color: #333;
  flex: 1;
`;

const CartItemPriceQuantityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;  /* Added space between price and quantity */
`;

const CartItemPrice = styled.div`
  font-size: 1.2rem;
  color: #e74c3c;  /* Adjusted to red for price */
`;

const CartItemQuantity = styled.div`
  font-size: 1.2rem;
  color: white;  /* Made the quantity text white */
`;

const RemoveButton = styled.button`
  padding: 8px 15px; /* Increased padding for better spacing */
  font-size: 1rem; /* Adjusted font size */
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c0392b;
  }
  margin-top: 10px; /* Added some margin for spacing */
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
  text-align: right;
`;

const CheckoutButton = styled.button`
  padding: 12px 30px;
  font-size: 1rem;
  background-color: rgb(64, 193, 172);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #218838;
  }
`;

const EmptyCartMessage = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  text-align: center;
`;

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    // ... (existing checkout logic) ...
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
        <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
      ) : (
        <CartCard>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <CartItemName>{item.name}</CartItemName>
              <CartItemPriceQuantityWrapper>
                <CartItemPrice>${item.price}</CartItemPrice>
                <CartItemQuantity>Qty: {item.quantity}</CartItemQuantity>
              </CartItemPriceQuantityWrapper>
              <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
            </CartItem>
          ))}
          <TotalPrice>Total: ${totalPrice}</TotalPrice>
          <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
        </CartCard>
      )}
    </CartContainer>
  );
};

export default Cart;
