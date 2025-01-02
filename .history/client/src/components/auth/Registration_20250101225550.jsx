import { useState, useEffect } from "react";
import { object, string } from "yup";
import { Formik } from "formik";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useOutletContext, useNavigate } from "react-router-dom";

const signupSchema = object({
    name: string("Name must be of type string")
        .min(3, "Name must be 3 characters or more")
        .required("Name is required"),
    email: string("Email must be of type string")
        .email("Email must be valid")
        .max(40, "Email must be 40 characters max")
        .required("Email is required"),
    password: string("Password must be of type string")
        .min(8, "Password has to be at least 8 characters long")
        .max(20, "Password must be 20 characters long max")
        .required("Password is required"),
});

const signinSchema = object({
    email: string("Email has to be a string")
        .email("Email must be valid")
        .max(40, "Email must be 40 characters max")
        .required("Email is required"),
    password: string("Password has to be a string")
        .min(8, "Password has to be at least 8 characters long")
        .max(20, "Password must be 20 characters long max")
        .required("Password is required"),
});

const initialValues = {
    name: "",
    email: "",
    password: "",
};

const Registration = () => {
    const { setUser } = useOutletContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (values) => {
        setLoading(true);

        const { name, email, password } = values;

        const response = await fetch("http://localhost:5000/api/v1/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            toast.error(data.error || "Something went wrong.");
        } else {
            const data = await response.json();
            setUser(data);
            toast.success("Welcome! You are now registered.");
            navigate("/dashboard");  // Redirect to the dashboard after registration
        }

        setLoading(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <span>{touched.name && errors.name}</span>

                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                    />
                    <span>{touched.email && errors.email}</span>

                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <span>{touched.password && errors.password}</span>

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Registration;

// Styled Components
const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
  h2 {
    margin-bottom: 10px;
    color: #333;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 16px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 15px;
  label {
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
  }
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;
