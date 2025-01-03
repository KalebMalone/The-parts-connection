import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styled from 'styled-components';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <CardContainer>
      <ProductImage src={`/image/${products.image_url}`} alt={products.name} />
      <ProductDetails>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>${product.price}</ProductPrice>
        <AddToCartButton onClick={handleAddToCart}>
          Add to Cart
        </AddToCartButton>
      </ProductDetails>
    </CardContainer>
  );
};

export default ProductCard;

// ... (Rest of the styled-components code)

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-top: 10px;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
`;

const AddToCartButton = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 1rem;

  &:hover {
    background-color: #27ae60;
  }
`;
