import React from 'react';
import styled from 'styled-components';

// ProductCard Component
const ProductsCard = ({ product }) => {
  // Fallback image if no product image is provided
  const productImage = product.image || '/images/default-product.png';

  return (
    <Card>
      <ImageContainer>
        <ProductImage src={productImage} alt={product.name} />
      </ImageContainer>

      <CardContent>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <Price>${product.price.toFixed(2)}</Price>

        <Button>Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

// Styled components for dynamic styling
const Card = styled.div`
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  margin: 15px;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const ProductTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 15px;
  height: 60px; /* Ensure description is limited to a specific height */
  overflow: hidden;
`;

const Price = styled.p`
  font-size: 1.4rem;
  color: #007BFF;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default ProductsCard;
