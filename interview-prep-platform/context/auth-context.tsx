"use client";

import { createContext, useContext } from "react";

const Context = createContext(null);

const AuthContext = ({  children } : {
    children: React.ReactNode
}) => {
  return (
    <Context.Provider value={null}>
        {children}
    </Context.Provider>
  )
}

export default AuthContext

export const useAuthProvider = () => {
    const context = useContext(Context);
    if(!context){
        throw new Error('auth provider must not be used outside of its context');
    }
    return context
}