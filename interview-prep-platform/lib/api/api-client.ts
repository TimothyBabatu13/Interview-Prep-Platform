import { toast } from "sonner";
import { getToken, removeToken, setToken } from "../memory";

export interface ApiOptions extends RequestInit {
  auth?: boolean;              
}

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}


export function handleApiError(status: number, data: any) {
  switch (status) {
    case 400:
      toast.error(data?.message || "Bad Request. Check your input.");
      break;
    case 401:
      toast.error(data?.message || "Unauthorized. Please log in again.");
      break;
    case 403:
      toast.error(data?.message || "Forbidden. You do not have permission.");
      break;
    case 404:
      toast.error(data?.message || "Resource not found.");
      break;
    case 422:
      toast.error(data?.message || "Validation error.");
      break;
    case 500:
      toast.error(data?.message || "Server error. Please try again later.");
      break;
    default:
      toast.error(data?.message || "An unexpected error occurred.");
      break;
  }
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;

  refreshPromise = fetch(`/api/auth/refresh`, {
    method: "GET",
    credentials: "include",
  })
    .then(async (res) => {
      if (!res.ok) return null;

      const json = await res.json();
      const newToken = json?.token;

      if (newToken) {
        setToken(newToken)
        return newToken;
      }
      return null;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}


export async function apiClient<T = any>(
  url: string,
  options: ApiOptions = {}
): Promise<T | null> {

  
  try {
    const { ...fetchOptions } = options;
  
    // Ensure headers is always a Record<string, string>
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(fetchOptions.headers as Record<string, string> | undefined),
    };
   
    
    // Attach Authorization token safely
    let accessToken = await getToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    // First request attempt
    let res = await fetch(url, {
      ...fetchOptions,
      headers,
      credentials: "include",
    });

    let data: any = null;
    
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    //Token expired and then attempt refresh
    if (res.status === 401) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        
        await removeToken();
        toast.error("Session expired. Please log in again.");
        return null;
      }

      // Retry request with new token
      headers.Authorization = `Bearer ${newToken}`;

      res = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: "include",
      });

      try {
        data = await res.json();
      } catch {
        data = null;
      }
    }

    if (!res.ok && res.status !== 401) {
      handleApiError(res.status, data);
    //  throw new ApiError(
    //   data?.message || "Request failed",
    //   res.status,
    //   data
    // );
    }

    return data as T;
  } catch (err) {
    const error = err as Error;
    console.log(error.message)
    toast.error(error.message);
    return null;
  }
}