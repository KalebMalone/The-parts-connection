import styled from "styled-components";
import { Link } from "react-router-dom";

function CategoryCard({ name, id }) {
    return (
        <Card>
            <Link to={`/categories/${id}`}>
                <CardContent>
                    <h2>{name}</h2>
                </CardContent>
            </Link>
        </Card>
    );
}

export default CategoryCard;

const Card = styled.li`
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

const CardContent = styled.div`
    padding: 20px;
    text-align: center;
    
    h2 {
        font-size: 24px;
        font-weight: 500;
        color: #333;
        margin: 0;
        transition: color 0.3s ease;
    }

    h2:hover {
        color: #007bff;  /* Blue color on hover */
    }
`;