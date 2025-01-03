import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Styled components for layout
const CategoriesContainer = styled.div`
  padding: 20px;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const CategoryCard = styled.div`
  cursor: pointer;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
  }

  h2 {
    margin-top: 10px;
    font-size: 1.2em;
  }
`;

function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const resp = await fetch('/api/v1/categories');
            const data = await resp.json();

            if (resp.ok) {
                setCategories(data);
            } else {
                toast.error(data.error);
            }
        })();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/categories/${categoryId}/products`);
    };

    return (
        <CategoriesContainer>
            <h1>Explore Our Categories</h1>
            <CategoriesGrid>
                {categories.map((category) => (
                    <CategoryCard key={category.id} onClick={() => handleCategoryClick(category.id)}>
                        {/* Displaying image directly from the public folder */}
                        <img src={`/images/${category.image_url}`} alt={category.name} />
                        <h2>{category.name}</h2>
                    </CategoryCard>
                ))}
            </CategoriesGrid>
        </CategoriesContainer>
    );
}

export default CategoriesList;
