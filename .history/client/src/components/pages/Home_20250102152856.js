import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
`;

const HeroSection = styled.section`
  background-image: url('/image/Main.png');
  background-size: cover;
  background-position: center;
  height: 65vh; /* Adjusted to make form appear higher */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 15px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
`;

const FilterSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
`;

const FilterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #666;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #007BFF;
  }
`;

const Button = styled.button`
  background-color:rgb(64, 193, 172);
  color: white;
  font-size: 1rem;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #36a994;
  }
`;

const ClearLink = styled.span`
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
`;

const Home = () => {
    const carData = [
        { name: 'A3', brand: 'AUDI', year: 2022 },
        { name: 'A4', brand: 'AUDI', year: 2021 },
        { name: 'A5', brand: 'AUDI', year: 2020 },
        { name: 'Q7', brand: 'AUDI', year: 2023 },
        { name: 'Q5', brand: 'AUDI', year: 2021 },
        { name: 'RS7', brand: 'AUDI', year: 2022 },
    ];

    const brands = [...new Set(carData.map((car) => car.brand))];

    const formik = useFormik({
        initialValues: {
            year: '',
            brand: '',
            model: '',
        },
        validationSchema: Yup.object({
            year: Yup.string().required('Year is required'),
            brand: Yup.string().required('Brand is required'),
            model: Yup.string().required('Model is required'),
        }),
        onSubmit: (values) => {
            window.location.href = `/categories?year=${values.year}&brand=${values.brand}&model=${values.model}`;
        },
    });

    const models = carData
        .filter(
            (car) =>
                car.brand === formik.values.brand
        )
        .map((car) => car.name);

    const filteredYears = carData
        .filter(
            (car) =>
                car.brand === formik.values.brand &&
                car.name === formik.values.model
        )
        .map((car) => car.year);

    return (
        <Container>
            <HeroSection>
                <div>
                    <HeroTitle></HeroTitle>
                </div>
            </HeroSection>

            <FilterSection>
                <FilterForm onSubmit={formik.handleSubmit}>
                    {/* Audi (Brand) */}
                    <FilterGroup>
                        <Label htmlFor="brand">AUDI</Label>
                        <Select
                            id="brand"
                            name="brand"
                            value={formik.values.brand}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Select make</option>
                            {brands.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </Select>
                        {formik.touched.brand && formik.errors.brand && (
                            <ErrorMessage>{formik.errors.brand}</ErrorMessage>
                        )}
                    </FilterGroup>

                    {/* Model */}
                    <FilterGroup>
                        <Label htmlFor="model">MODEL</Label>
                        <Select
                            id="model"
                            name="model"
                            value={formik.values.model}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={!formik.values.brand}
                        >
                            <option value="">Select Model</option>
                            {models.map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                        </Select>
                        {formik.touched.model && formik.errors.model && (
                            <ErrorMessage>{formik.errors.model}</ErrorMessage>
                        )}
                    </FilterGroup>

                    {/* Year */}
                    <FilterGroup>
                        <Label htmlFor="year">YEAR</Label>
                        <Select
                            id="year"
                            name="year"
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={!formik.values.model}
                        >
                            <option value="">Select Year</option>
                            {filteredYears.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </Select>
                        {formik.touched.year && formik.errors.year && (
                            <ErrorMessage>{formik.errors.year}</ErrorMessage>
                        )}
                    </FilterGroup>

                    <Button type="submit">Search</Button>

                    <ClearLink onClick={() => formik.resetForm()}>✕ clear filters</ClearLink>
                </FilterForm>
            </FilterSection>
        </Container>
    );
};

export default Home;
