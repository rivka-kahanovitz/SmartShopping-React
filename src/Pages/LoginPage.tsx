import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Services/auth.service";
import { Paths } from "../Routers/paths";
import { Header } from "../components/Header";
import { Spinner } from "../components/Spinner";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true); // מתחילים טעינה

    const formData = new FormData(event.currentTarget);
    try {
      const email: string = formData.get("email")?.toString() || "";
      const password: string = formData.get("password")?.toString() || "";
      const token = await login(email, password);
      localStorage.setItem("token", token.token);
      localStorage.setItem("tokenExpiration", token.expiresAt);
      localStorage.setItem("role", token.role);
      alert("התחברת בהצלחה!");
      navigate(`/${Paths.shoppingLists}`);
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("שם משתמש או סיסמה שגויים");
      } else {
        alert("שגיאה! נסה שוב מאוחר יותר...");
      }
    } finally {
      setIsLoading(false); // מסיימים טעינה
    }
  };

  // מצב טעינה: מציג ספינר באמצע הדף
  if (isLoading) return <Spinner />;

  return (
    <>
      <Header />
      <div className="container">
        <h2>התחברות</h2>
        <form onSubmit={onSubmit}>
          <label>אימייל</label>
          <input name="email" type="email" required />

          <label>סיסמה</label>
          <div style={{ position: "relative" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              style={{ paddingRight: "40px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                fontSize: "16px",
              }}
              aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
            >
              {showPassword ? "👁️" : "👁️"}
            </button>
          </div>

          <p style={{ marginTop: "20px" }}>
            שכחת סיסמה? <Link to={`/${Paths.forgotPassword}`}>איפוס סיסמה</Link>
          </p>

          <p style={{ marginTop: "20px" }}>
            עדיין לא רשום? <Link to={`/${Paths.signup}`}>הרשם כאן</Link>
          </p>

          <button type="submit" disabled={isLoading}>
            התחבר
          </button>
        </form>
      </div>
    </>
  );
};
