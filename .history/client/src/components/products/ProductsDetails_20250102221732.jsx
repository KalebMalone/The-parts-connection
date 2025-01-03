import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { useCart } from '../../contexts/CartContext';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

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

    const handleAddToCart = (product) => {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    };
  
    if (!product) {
      return <LoadingText>Loading...</LoadingText>;
    }
  
    return (
      <ProductPageWrapper>
        <ProductContentWrapper>
          <ProductImage
            src={`${process.env.PUBLIC_URL}/image/${product.imageUrl}`}
            alt={product.name}
            onError={(event) => {
              event.target.src = '/fallback-image.png'; // Replace with your fallback image path
            }}
          />
          <ProductInfo>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <PriceTag>${product.price}</PriceTag>
            <AddToCartButton onClick={() => handleAddToCart(product)}>
              Add to Cart
            </AddToCartButton>
          </ProductInfo>
        </ProductContentWrapper>
      </ProductPageWrapper>
    );
  }
  
  export default ProductDetails;
export default ProductDetails;

const ProductPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #f9f9f9;
`;

const ProductContentWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 30px;
  width: 100%;
`;

const ProductImage = styled.img`
  max-width: 500px;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 600px;
`;

const PriceTag = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e74c3c;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const AddToCartButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  width: fit-content;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
  color: #7f8c8d;
  text-align: center;
`;
