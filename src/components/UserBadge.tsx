import { useEffect, useState } from "react";
import { parseJwt } from "../Pages/UsersPage";
import { getUserById } from "../Services/user.service";
import { useNavigate } from "react-router-dom";
import { Paths } from "../Routers/paths";
import "../App.css"
export const UserBadge = () => {
  const [userName, setUserName] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const userId = parseInt(parseJwt(token).id);
        const current = await getUserById(userId);
        setUserName(current.name);
      } catch (error) {
        console.error("שגיאה בהבאת המשתמש", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => 
    {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("role");
    alert("התנתקת מהמערכת")
    navigate(`/${Paths.login}`)
  };

  if (!userName) return null;
  const displayText = userName.substring(0, 2).toUpperCase();

 return (
  <div className="user-badge-wrapper">
    <div
      onClick={() => setShowMenu(!showMenu)}
      className="user-badge-circle"
    >
      {displayText}
    </div>

    {showMenu && (
      <div className="user-badge-menu">
        <button onClick={handleLogout}>התנתק</button>
      </div>
    )}
  </div>
);
}

