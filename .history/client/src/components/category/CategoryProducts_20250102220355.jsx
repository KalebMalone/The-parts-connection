import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styled from 'styled-components';

function CategoryProducts() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const resp = await fetch(`/api/v1/products/category/${categoryId}`);
            const data = await resp.json();

            if (resp.ok) {
                setProducts(data);
            } else {
                toast.error(data.error);
            }
        })();
    }, [categoryId]);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <ProductsContainer>
            <h1>Products in Category {categoryId}</h1>
            <ProductsGrid>
                {products.map((product) => (
                    <ProductCard key={product.id} onClick={() => handleProductClick(product.id)}>
                        <ProductImage src={products.image_url} alt={products.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </ProductCard>
                ))}
            </ProductsGrid>
        </ProductsContainer>
    );
}

export default CategoryProducts;

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    font-size: 36px;
    color: #333;
    font-weight: 600;
    margin-bottom: 40px;
    font-family: 'Roboto', sans-serif;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
`;

const ProductCard = styled.div`
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    background-color: #fafafa;
  }

  h2 {
    font-size: 32px;
    font-weight: 500;
    color: #333;
    margin: 0;
    transition: color 0.3s ease;
  }

  &:hover h2 {
    color: #007bff;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;
