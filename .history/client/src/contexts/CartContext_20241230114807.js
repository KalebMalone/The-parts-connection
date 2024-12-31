import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart items from localStorage on component mount
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart)); // Set the state with cart items from localStorage
        }
    }, []);

    useEffect(() => {
        // Whenever the cart items change, save them to localStorage
        if (cartItems.length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                // If the item is already in the cart, update the quantity
                return prevCart.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                // If the item is not in the cart, add it
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Clear from localStorage as well
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
