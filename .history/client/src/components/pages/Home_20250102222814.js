import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f7f7f7; /* Light gray background */
  font-family: 'Open Sans', sans-serif; /* Modern sans-serif font */
  margin: 0;
  padding: 40px; /* Add some padding for content spacing */
`;

const HeroSection = styled.section`
  background-image: url('/image/Main.png'); /* Replace with your hero image */
  background-size: cover;
  background-position: center;
  height: 50vh; /* Adjust height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff; /* White text for contrast */
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Subtle text shadow */
`;

const FilterSection = styled.section`
  background-color: #fff; /* White background for filter form */
  border-radius: 4px; /* Rounded corners for a softer look */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle box shadow */
  display: flex;
  flex-direction: column; /* Stack filters vertically */
  justify-content: center;
  align-items: center;
  margin: 20px 0; /* Add some margin for separation */
  padding: 20px;
`;

const FilterForm = styled.form`
  display: flex;
  flex-wrap: wrap; /* Allow filters to wrap on smaller screens */
  justify-content: space-between; /* Space filters evenly */
  width: 100%; /* Form takes up full width */
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px; /* Spacing between filter groups */
  width: calc(50% - 10px); /* Responsive width for two columns */
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333; /* Darker gray for labels */
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px; /* Rounded corners for a more modern look */
  min-width: 150px;
  outline: none; /* Remove default outline */

  &:focus {
    border-color: #007bff; /* Blue border on focus */
  }
`;

const Button = styled.button`
  background-color: #3498db; /* Blue button color */
  color: white;
  font-size: 1rem;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px; /* Spacing after filters */

  &:hover {
    background-color: #2980b9; /* Darker blue on hover */
  }
`;

const ClearLink = styled.span`
  color: #999; /* Light gray for clear link */
  font-size: 0.9rem;
  cursor: pointer;
  margin-left: 10px; /* Spacing from button */

  &:hover {
    color: #333; /* Darker gray on hover */
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px; /* Spacing above error message */
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
      (car) => car.brand === formik.values.brand
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
        <HeroTitle>Welcome to Our Car Finder</HeroTitle> 
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