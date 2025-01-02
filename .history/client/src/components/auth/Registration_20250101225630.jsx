import { useState } from "react";
import { object, string } from "yup";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { useOutletContext, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
        <FormContainer>
            <Formik
                initialValues={initialValues}
                validationSchema={signupSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>

                        <Input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />
                        <ErrorMessage>{touched.name && errors.name}</ErrorMessage>

                        <Input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                        />
                        <ErrorMessage>{touched.email && errors.email}</ErrorMessage>

                        <Input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <ErrorMessage>{touched.password && errors.password}</ErrorMessage>

                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f7fc;
    padding: 20px;
`;

const Form = styled.form`
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;

    h1 {
        font-size: 24px;
        color: #333;
        text-align: center;
        margin-bottom: 20px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: #fafafa;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 10px;
    display: block;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

export default Registration;
