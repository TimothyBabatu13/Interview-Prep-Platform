"use client";

import LoadingPage from "@/components/loading";
import { useAuthProvider } from "./auth-context"
import { useRouter } from "next/navigation"

const ProtectedRoute = ({ children } : {
    children: React.ReactNode
}) => {
    const { isLoading, user } = useAuthProvider()
    const router = useRouter();

    if(isLoading){
        return <LoadingPage />
    }

    if(!isLoading && !user){
        router.push('/login')
    }
    
    return (
    <div>{children}</div>
)
}

export default ProtectedRoute