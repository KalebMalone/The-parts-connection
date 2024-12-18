import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/pages/Home';
import CategoriesList from '../components/category/CategoriesList';
import CategoryDetails from '../components/category/CategoryDetails';
import ProductsList from '../components/products/ProductsList';
import ProductDetails from '../components/products/ProductsDetails';
import App from '../App';
import Profile from '../components/users/profile'; // Import Profile component
import Registration from '../components/auth/Registration'; // Import Registration component (your signup/login page)

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true, // Default route at "/"
                element: <Home />,
            },
            {
                path: "categories",
                element: <CategoriesList />,
            },
            {
                path: "categories/:categoryId",
                element: <CategoryDetails />,
            },
            {
                path: "search",  // This route will handle filters applied from Home
                element: <ProductsList />,
            },
            {
                path: "products/:productId", // Dynamic route for product details
                element: <ProductDetails />,
            },
            {
                path: "profile",  // Profile route
                element: <Profile />,
            },
            {
                path: "signup",  // Registration route
                element: <Registration />, // Show the Registration component here
            }
        ],
    },
]);
