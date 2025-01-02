import { useState, useEffect } from "react";
import { object, string } from "yup";
import { Formik } from "formik";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useOutletContext, useNavigate } from "react-router-dom";

const signupSchema = object({
    name: string("name must be of type string")
        .min(3, "name must be 3 characters or more")
        .required("name is required"),
    email: string("email must be of type string")
        .email("email must be valid")
        .max(40, "email must be 40 characters max")
        .required("email is required"),
    password: string("password must be of type string")
        .min(8, "password has to be at least 8 characters long")
        .max(20, "password must be 20 characters long max")
        .required("password is required"),
});

const signinSchema = object({
    email: string("email has to be a string")
        .email("email must be valid")
        .max(40, "email must be 40 characters max")
        .required("email is required"),
    password: string("password has to be a string")
        .min(8, "password has to be at least 8 characters long")
        .max(20, "password must be 20 characters long max")
        .required("password is required"),
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

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            updateUser(storedUser);
            navigate("/"); // Redirect to home
        }
    }, [navigate, updateUser]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        updateUser(null); // Clear user from context
        toast.success("Logged out successfully!");
    };

    return (
        <Container>
            <Header>
                <h2>{isLogin ? "Welcome Back!" : "Join Us!"}</h2>
                <ToggleButton onClick={() => setIsLogin((current) => !current)}>
                    {isLogin ? "Not a Member? Register Here" : "Already a Member? Log In"}
                </ToggleButton>
                {currentUser && <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>}
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
                            localStorage.setItem("user", JSON.stringify(data.user)); // Save user to localStorage
                            toast.success(
                                isLogin ? `Welcome back, ${data.user.name}!` : `Welcome, ${data.user.name}!`
                            );
                            updateUser(data.user);
                            navigate("/");
                        } else {
                            toast.error(data.error || "Something went wrong!");
                        }
                    } catch (error) {
                        toast.error("Something went wrong!");
                        console.error(error);
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

// Add a LogoutButton styled component
const LogoutButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #d32f2f;
  }
`;
