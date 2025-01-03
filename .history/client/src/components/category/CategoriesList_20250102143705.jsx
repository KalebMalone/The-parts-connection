import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function CategoriesList() {
    const navigate = useNavigate();

    // Static category data for frontend usage
    const categories = [
        { id: 1, name: "Jewelry", image: "/images/jewelry.jpg" },
        { id: 2, name: "Clothing", image: "/images/clothing.jpg" },
        { id: 3, name: "Shoes", image: "/images/shoes.jpg" },
        { id: 4, name: "Bags", image: "/images/bags.jpg" },
        { id: 5, name: "Watches", image: "/images/watches.jpg" },
        { id: 6, name: "Accessories", image: "/images/accessories.jpg" },
    ];

    const handleCategoryClick = (categoryId) => {
        navigate(`/categories/${categoryId}/products`);
    };

    return (
        <CategoriesContainer>
            <h1>Explore Our Categories</h1>
            <CategoriesGrid>
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        image={category.image}
                        onClick={() => handleCategoryClick(category.id)}
                    />
                ))}
            </CategoriesGrid>
        </CategoriesContainer>
    );
}

export default CategoriesList;

const CategoriesContainer = styled.div`
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
`;
