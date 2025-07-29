import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import {Paths} from "../Routers/paths";

export const HomePage = () => {
  const navigate = useNavigate();

 return (
  <>
    <Header />
    <div
      className="background-image"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/Images/supermarket.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.2,   // שקיפות של הרקע
        zIndex: -1,     // מתחת לכל התוכן
      }}
    />
    <div className="container" style={{ textAlign: "center", marginTop: "50px", position: "relative", zIndex: 1 }}>
      <h2>ברוכים הבאים ל-SmartShopping!</h2>
      {/* הסרתי את תגית ה-img כי התמונה ברקע */}
      <p style={{ maxWidth: "600px", margin: "20px auto", fontSize: "18px", lineHeight: "1.6" }}>
        כאן תוכלו להשוות בין מחירי מוצרי המזון מכל הסופרים הגדולים,
        לבחור את המוצרים שברשימת הקניות שלכם ולגלות איפה הכי משתלם לכם לבצע את הקנייה.
        חוסכים זמן וכסף – קניות עושים חכם!
      </p>
      <button
        onClick={() => navigate(`/${Paths.login}`)}
        style={{
          backgroundColor: "#3498db",
          color: "white",
          padding: "12px 30px",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginTop: "30px",
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = "#2980b9")}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = "#3498db")}
      >
        לאזור האישי
      </button>
    </div>
  </>
);

};
