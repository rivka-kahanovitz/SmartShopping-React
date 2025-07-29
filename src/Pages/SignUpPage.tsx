import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../Services/auth.service";
import { Header } from "../components/Header";
import { Paths } from "../Routers/paths";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name: string = formData.get("name")?.toString() || "";
    const email: string = formData.get("email")?.toString() || "";
    const password: string = formData.get("password")?.toString() || "";

    try {
      await signUp(name, email, password);
      alert("נרשמת בהצלחה! אתה מועבר להתחברות");
      navigate(`/${Paths.login}`);
    } catch (error) {
      alert("שגיאה בהרשמה, נסה שוב");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <form onSubmit={onSubmit}>
          <div>name</div>
          <input name="name" required />

          <div>email</div>
          <input name="email" required />

          <div>password</div>
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

          <button disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : "Sign Up"}
          </button>

          רשום? <Link to={`/${Paths.login}`}>התחבר</Link>
        </form>
      </div>

      {/* CSS ספינר */}
      <style>{`
        .spinner {
          border: 4px solid rgba(0,0,0,0.1);
          border-left-color: #09f;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: inline-block;
          vertical-align: middle;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};
