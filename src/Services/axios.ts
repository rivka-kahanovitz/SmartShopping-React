import axios from "axios";
import { removeSession } from "../auth/auth.utils";
import { useNavigate } from "react-router-dom";
import {Paths} from "../Routers/paths"
// כתובת הבסיס של ה־API שלך
const baseURL = 'https://localhost:64885/api';

// יצירת מופע axios
const axiosInstance = axios.create({ baseURL });

// Interceptor לבקשות – מוסיף Authorization header 
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ░░ Interceptor לתשובות – מטפל בשגיאות מסוג 401 ░░
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    const navigate = useNavigate();
    // לא ניגע בשגיאה של login
    if (originalRequest?.url?.includes('/UserLogin/login')) {
      return Promise.reject(error);
    }

    // אם קיבלנו 401 – נמחק את הטוקן
    if (error.response && error.response.status === 401) {
      removeSession();
      alert("התחברות פגה תוקף. התחברי מחדש.");
      navigate(`/${Paths.login}`);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
