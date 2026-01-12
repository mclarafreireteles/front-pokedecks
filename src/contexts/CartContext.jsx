import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("@pokedecks:cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("@pokedecks:cart", JSON.stringify(cartItems));
    }, [cartItems]);


    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Verifica se o item já existe
            const itemExists = prevItems.find((item) => item.id === product.id);

            if (itemExists) {
                // Se existe, aumenta a quantidade
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Se não existe, adiciona com quantidade 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        alert("Produto adicionado ao carrinho!"); // Feedback simples
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, amount) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + amount;
                    // Garante que a quantidade nunca seja menor que 1
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
                }
                return item;
            })
        );
    };

    const cartTotal = cartItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext);
}