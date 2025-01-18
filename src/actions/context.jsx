import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [user, setUserDetails] = useState({});
  const [history, setHistory] = useState([]);
  const [diseases, setDiseases] = useState('');
  const [initial, setInitial] = useState('');
  
  const addHistory = (data) => {
    setHistory([...history,data]);
  }

  return (
    <CartContext.Provider value={{isLogin,setIsLogin,name,setName,user,setUserDetails,history,setHistory,addHistory,diseases, setDiseases,initial, setInitial}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useContexty must be used within a CartProvider');
  }
  return context;
};