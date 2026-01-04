"use client";

import AuthContext from "./auth-context";

const Context = ({ children } : {
    children: React.ReactNode
}) => {
  return (
  <AuthContext>
    {children}
    </AuthContext>
  )
}

export default Context