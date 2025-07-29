import { FormEvent, useState } from "react";
import { Header } from "../components/Header";
import { forgotPassword } from "../Services/user.service"
import { useNavigate } from "react-router-dom";
import {Paths} from "../Routers/paths";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      alert("סיסמה חדשה נשלחה למייל שלך.");
      navigate(`/${Paths.login}`)
    } 
    catch (error: any) {
      setMessage(
        error.response?.data || "אירעה שגיאה בשליחת המייל, נסה שוב מאוחר יותר."
      );
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>שכחתי סיסמה</h2>
        <form onSubmit={onSubmit}>
          <label>הזן את כתובת המייל איתה נרשמת לאתר</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">שלח סיסמה חדשה</button>
        </form>
        {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      </div>
    </>
  );
};
