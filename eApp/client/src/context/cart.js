import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let cartItem = localStorage.getItem("cart");
    if (cartItem) setCart(JSON.parse(cartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const CartAuth = () => useContext(CartContext);
export { CartAuth, CartProvider };
