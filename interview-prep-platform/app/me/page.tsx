"use client";

import { Button } from "@/components/ui/button";

const page = () => {

    const fetchData = async () => {
        try {
            const api = await fetch('/api/auth/me', {
                credentials: 'include',
                headers: {
                    "Authorization": "Bearer jsjdsjdsj"
                }
            });
            const res = await api.json()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        Me
        <Button onClick={fetchData}>
            Click
        </Button>
    </div>
  )
}

export default page