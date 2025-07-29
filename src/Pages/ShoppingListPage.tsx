import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../Routers/paths";
import { ShoppingListService } from "../Services/ShoppingListService";
import { Header } from "../components/Header";
import {ShoppingListItemDto, ShoppingListDto} from "../Dto/ShoppingListDto"
interface UserToken {
  name: string; 
}

export const ShoppingListsPage = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListDto[]>([]);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // טוען את סלי הקניות
    ShoppingListService.getAll()
      .then(setShoppingLists)
      .catch(error => console.error("Failed to fetch shopping lists", error));
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])) as UserToken;
        // כאן את יכולה לבחור איזה שדה להציג, לדוגמה ראשי תיבות או השם המלא
        setUserName(payload.name || "משתמש");
      } catch {
        setUserName("משתמש");
      }
    }
  }, []);

  const handleCreateNewList = () => {
    navigate(`/${Paths.ProductPage}`);
  };

  const handleViewList = (id: number) => {
    navigate(`/${Paths.shoppingLists}/${id}`);
  };

  return (
    <>
      <Header />
      <div className="container" style={{ position: "relative" }}>

        <h2>סלי הקניות שלי</h2>

        <button onClick={handleCreateNewList} style={{ marginBottom: "20px" }}>
          + הוסף סל חדש
        </button>

        <div className="shopping-list-grid">
          {shoppingLists.map(list => (
            <div key={list.id} className="shopping-list-card">
              <div className="shopping-list-title">{list.title}</div>
              <div className="shopping-list-items-count">
              </div>
              <button
                className="view-button"
                onClick={() => handleViewList(list.id)}>
                צפה בפרטים
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
