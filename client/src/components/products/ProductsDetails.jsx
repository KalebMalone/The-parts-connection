import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/v1/products/${productId}`);
      const data = await resp.json();

      if (resp.ok) {
        setProduct(data);
      } else {
        toast.error(data.error);
      }
    })();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Image src={product.image} alt={product.name} />
      <Details>
        <Title>{product.name}</Title>
        <Price>${product.price}</Price>
        <Description>{product.description}</Description>
        <Button>Add to Cart</Button>
      </Details>
    </Container>
  );
};

export default ProductDetails;

const Container = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 40px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 50%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
`;

const Details = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
