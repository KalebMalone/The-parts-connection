import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styled from 'styled-components';

function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`/api/v1/products/category/${categoryId}`);
        const data = await resp.json();

        if (!resp.ok) {
          throw new Error(data.error);
        }

        setProducts(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <ProductsContainer>
      <TitleSection>
        <h1>Products</h1>
      </TitleSection>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} onClick={() => handleProductClick(product.id)}>
            <ProductImage src={`/image/${product.image_url}`} alt={product.name} />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  justify-items: center;
  margin-top: 20px;
  transform: translateX(-100px);  /* Shift the grid to the left */
`;

const ProductCard = styled.div`
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;
