"use client";

import { apiClient } from "@/lib/api/api-client";
import { getToken } from "@/lib/memory";
import { ME_TYPE, USER_TYPE } from "@/types/auth.types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface ContextProps {
  isLoading: boolean,
  userId: string | null,
  setUserId: Dispatch<SetStateAction<string | null>>,
  user: USER_TYPE | null,
  setUser: Dispatch<SetStateAction<USER_TYPE | null>>
}

const Context = createContext<ContextProps>({
  isLoading: true,
  userId: null,
  setUserId: () => {},
  user: null,
  setUser: () =>{}
});

const AuthContext = ({  children } : {
  children: React.ReactNode
}) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<USER_TYPE | null>(null);

  const fetchUserToken = async () => {
    try {
      const result = await getToken();
      if(!result) return;

      const user = await apiClient<ME_TYPE>('/api/auth/me', {
        method: "GET"
      })

      if(user){
        setUser(user.data);
      }

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
    <Context.Provider value={{isLoading: isLoading, setUserId: setUserId, userId: userId, user: user, setUser:setUser}}>
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