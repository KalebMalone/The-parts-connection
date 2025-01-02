import CategoryCard from '../category/CategoryCard';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

function CategoryContainer() {
    const { categories } = useOutletContext();

    return (
        <Container>
            <Title>All Categories</Title>
            <CardContainer>
                {categories && categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </CardContainer>
        </Container>
    );
}

export default CategoryContainer;

const Container = styled.div`
    padding: 40px;
    background-color: #f8f8f8;
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    font-size: 36px;
    margin-bottom: 20px;
    font-weight: 700;
`;

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 20px;
    padding: 0 10px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
`;