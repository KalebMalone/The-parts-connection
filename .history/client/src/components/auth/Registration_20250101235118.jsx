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
    const [isLogin, setIsLogin] = useState(true);
    const { currentUser, updateUser } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/"); // Redirect to home if user is already logged in
        }
    }, [currentUser, navigate]);

    return (
        <Container>
            <Header>
                <h2>{isLogin ? "Welcome Back!" : "Join Us!"}</h2>
                <ToggleButton onClick={() => setIsLogin((current) => !current)}>
                    {isLogin ? "Not a Member? Register Here" : "Already a Member? Log In"}
                </ToggleButton>
            </Header>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    const url = isLogin ? "/api/v1/login" : "/api/v1/signup";
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(values),
                        });
                        const data = await response.json();

                        if (response.ok) {
                            if (data && data.name && data.email) {
                                toast.success(
                                    isLogin
                                        ? `Welcome back, ${data.name}!`
                                        : `Welcome, ${data.name}!`
                                );
                                updateUser(data);  // Flattened response data
                                navigate("/");  // Redirect to home after successful login/signup
                            } else {
                                throw new Error("User data missing from response");
                            }
                        } else {
                            toast.error(data.error || "Something went wrong!");
                        }
                    } catch (error) {
                        console.error("Submission error:", error);
                        toast.error(error.message || "Unexpected error occurred!");
                    }
                }}
                validationSchema={isLogin ? signinSchema : signupSchema}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                    <StyledForm onSubmit={handleSubmit}>
                        {!isLogin && (
                            <FormField>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                {errors.name && touched.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                            </FormField>
                        )}
                        <FormField>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                        </FormField>
                        <FormField>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                        </FormField>
                        <SubmitButton type="submit">{isLogin ? "Log In" : "Sign Up"}</SubmitButton>
                    </StyledForm>
                )}
            </Formik>
        </Container>
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
