import React, { useState, useEffect } from 'react';
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
  height: 65vh;
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
  border: 1px solid #ccc; /* Default border */
  border-radius: 5px;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: rgb(64, 193, 172);
  }
`;

const Button = styled.button`
  background-color: rgb(64, 193, 172);
  color: white;
  font-size: 1rem;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  /* Aligned button to the right and vertically aligned with other elements */
  align-self: flex-end;
  margin-top: 10px; /* Add some margin for better alignment */

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
  // ... rest of the code remains the same ...

  return (
    <Container>
      <HeroSection>
        <HeroTitle></HeroTitle>
      </HeroSection>

      <FilterSection>
        <FilterForm onSubmit={formik.handleSubmit}>
          <FilterGroup>
            <Label htmlFor="brand">MAKE</Label>
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
          <FilterGroup>
            <Label htmlFor="model">MODEL</Label>
            <Select
              id="model"