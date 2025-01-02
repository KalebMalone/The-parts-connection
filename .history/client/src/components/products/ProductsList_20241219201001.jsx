import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductsContainer from './ProductsContainer';
import styled from 'styled-components';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    // Extract query parameters
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get('year');
    const brand = queryParams.get('brand');
    const model = queryParams.get('model');

    useEffect(() => {
        // Fetch products based on filters
        (async () => {
            const resp = await fetch(`/api/v1/products?year=${year}&brand=${brand}&model=${model}`);
            const data = await resp.json();
            if (resp.ok) {
                setProducts(data);
            }
        })();
    }, [year, brand, model]);

    return (
        <Container>
            <h2>Filtered Products</h2>
            <ProductsContainer products={products} />
        </Container>
    );
};

export default ProductsList;

const Container = styled.div`
  margin-top: 40px;
  padding: 20px;
`;
