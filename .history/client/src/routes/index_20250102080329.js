import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/pages/Home';
import CategoriesList from '../components/category/CategoriesList';
import CategoryDetails from '../components/category/CategoryDetails';
import CategoryProducts from '../components/category/CategoryProducts';
import ProductsList from '../components/products/ProductsList';
import ProductDetails from '../components/products/ProductsDetails';
import App from '../App';
import Profile from '../components/users/profile';
import Registration from '../components/auth/Registration';
import Cart from '../components/cart/Cart';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
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
                path: "categories/:categoryId/products",
                element: <CategoryProducts />,
            },
            {
                path: "search",
                element: <ProductsList />,
            },
            {
                path: "products/:productId",
                element: <ProductDetails />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "signup",
                element: <Registration />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
        ],
    },
]);
