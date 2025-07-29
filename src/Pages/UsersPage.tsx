import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../Services/user.service";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Paths } from "../Routers/paths";
import { Link } from "react-router-dom";
import { UserDto } from "../Dto/UserDto"
import {removeSession, getCurrentUserFromToken} from "../auth/auth.utils"
export const UsersPage = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [error, setError] = useState("");
  const [showLoginLink, setShowLoginLink] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const userId = parseInt(parseJwt(token).id);
      const current = await getUserById(userId);
      setCurrentUser(current);

      if (current.isAdmin) {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } else {
        setUsers([current]);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        alert("החיבור פג תוקף, אנא התחבר מחדש");
        navigate("/auth/login");
      } else {
        setError("כדי לצפות בפרטי החשבון עלייך להתחבר למערכת");
        setShowLoginLink(true);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: UserDto) => {
    setEditingUserId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleSaveEdit = async () => {
    if (editingUserId === null) return;
    try {
      await updateUser(editingUserId, {
        name: editName,
        email: editEmail,
      });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      alert("שגיאה בעדכון המשתמש");
    }
  };

  const handleDelete = async (userId: number) => {
  if (window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) {
    await deleteUser(userId);
    alert("נמחק");
    const currentUser = getCurrentUserFromToken();
    if (currentUser?.id === userId) {
      removeSession(); // מוחק טוקן ומנתב לדף התחברות
    } else {
      fetchUsers(); // רק אם לא מחקנו את עצמנו - נביא את הרשימה מחדש
    }
  }
};


  if (error) {
    return (
      <div className="container">
        <p>{error}</p>
        {showLoginLink && (
          <p>
            <Link to={`/${Paths.login}`}>להתחברות</Link>
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2>פרטי החשבון</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>שם</th>
              <th>אימייל</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  {editingUserId === u.id ? (
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                  ) : (
                    u.name
                  )}
                </td>
                <td>
                  {editingUserId === u.id ? (
                    <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                  ) : (
                    u.email
                  )}
                </td>
                <td>
                  {editingUserId === u.id ? (
                    <>
                      <button onClick={handleSaveEdit}>שמור</button>
                      <button onClick={() => setEditingUserId(null)}>ביטול</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(u)}>ערוך</button>
                      {(currentUser?.isAdmin || currentUser?.id === u.id) && (
                        <button onClick={() => handleDelete(u.id)}>מחק</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// === פונקציית עזר לפיענוח הטוקן ===
export const parseJwt = (token: string) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
};
