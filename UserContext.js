import React, { createContext, useState, useContext } from "react";

// Criação do contexto
const UserContext = createContext();

// Provider que envolve a aplicação
export const UserProvider = ({ children }) => {
  const [nomeDoUsuario, setNomeDoUsuario] = useState("");
  const [interno, setInterno] = useState()

  return (
    <UserContext.Provider value={{ nomeDoUsuario, setNomeDoUsuario, interno, setInterno }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useUser = () => {
  return useContext(UserContext);
};
