"use client";

import { apiClient } from "@/lib/api/api-client";
import { getToken } from "@/lib/memory";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface ContextProps {
  isLoading: boolean,
  userId: string | null,
  setUserId: Dispatch<SetStateAction<string | null>>
}

const Context = createContext<ContextProps>({
  isLoading: true,
  userId: null,
  setUserId: () => {}
});

const AuthContext = ({  children } : {
  children: React.ReactNode
}) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const fetchUserToken = async () => {
    try {
      const result = await getToken();
      if(!result) return;
      const user = await apiClient('/api/auth/me', {
        method: "GET"
      })
      console.log(user);

    } catch (error) {
      const err = error as Error
      console.log('an error occured', err.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchUserToken();
  }, [])


  return (
    <Context.Provider value={{isLoading: isLoading, setUserId: setUserId, userId: userId}}>
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