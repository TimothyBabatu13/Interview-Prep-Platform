import { ErrorToast } from "@/components/ui/toast";

// const handleStatusCode = (statusCode: number) => {
//     switch (statusCode) {

//     case 400:
//       ErrorToast('');
//       break;

//     case 401:
//       console.error("🔒 Unauthorized");
//       break;

//     case 403:
//       console.error("🚫 Forbidden");
//       break;

//     case 404:
//       console.error("🔎 Not Found");
//       break;

//     case 500:
//       console.error("💥 Server Error");
//       break;

//     default:
//       console.warn(`⚠️ Unexpected status code: ${statusCode}`);
//   }   
// }

export const makeRequest = async (url: string, init?: RequestInit) => {
    try {
        const api = await fetch(url, init);
        const res = await api.json()
        if(api.status === 400){
            ErrorToast(res as string);
            return;       
        }
        return res;
        
    } catch (error) {
        const err = error as Error
        ErrorToast(err.message)
    }
}