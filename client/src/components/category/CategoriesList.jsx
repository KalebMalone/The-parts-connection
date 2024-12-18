import { useEffect, useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function CategoriesList() {
    const [categories, setCategories] = useState([]);

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

    return (
        <CategoriesContainer>
            <h1>Explore Our Categories</h1>
            <CategoriesGrid>
                {categories.map((category) => (
                    <CategoryCard key={category.id}>
                        <Link to={`/categories/${category.id}`}>
                            <h2>{category.name}</h2>
                        </Link>
                    </CategoryCard>
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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* Increased min-width for larger cards */
  gap: 40px; /* Increased gap for more space between cards */
`;

const CategoryCard = styled.div`
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  padding: 35px; /* Increased padding inside the card */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    background-color: #fafafa;
  }

  a {
    text-decoration: none;
    color: #333;
    display: block;
    transition: color 0.3s ease;

    &:hover {
      color: #007bff;
    }
  }

  h2 {
    font-size: 32px; /* Increased font size */
    font-weight: 500;
    color: #333;
    margin: 0;
    transition: color 0.3s ease;
  }

  &:hover h2 {
    color: #007bff;
  }
`;