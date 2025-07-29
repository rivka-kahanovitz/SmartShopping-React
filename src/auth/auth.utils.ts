// import { Paths } from "../Routers/paths"
// import axios from "../services/axios"

import { Paths } from "../Routers/paths";

// export const setSession = (token: string) => {
//     localStorage.setItem('token', token)
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`
// }

// export const getSession = () => {
//     return localStorage.getItem('token')
// }

export const removeSession = () => 
{
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("tokenExpiration");
}
export type DecodedToken = {
  id: number
  role: "Admin" | "User" // או כל שם אחר שהשתמשת בו בצד השרת
  name: string
  email: string
  exp: number
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

export const getCurrentUserFromToken = (): DecodedToken | null => {
  const token = localStorage.getItem("token")
  if (!token) return null

  try {
    const payloadBase64 = token.split(".")[1]
    const payloadJson = atob(payloadBase64)
    const decoded: DecodedToken = JSON.parse(payloadJson)
    return decoded
  } catch (error) {
    console.error("שגיאה בפענוח הטוקן:", error)
    return null
  }
}

// export function jwtDecode(token: string) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//         window
//             .atob(base64)
//             .split('')
//             .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//             .join('')
//     );

//     return JSON.parse(jsonPayload);
// }

// export const isValidToken = (token: string) => {
//     if (!token) {
//         return false;
//     }

//     const decoded = jwtDecode(token);

//     const currentTime = Date.now() / 1000;

//     return decoded.exp > currentTime;
// };
export {}