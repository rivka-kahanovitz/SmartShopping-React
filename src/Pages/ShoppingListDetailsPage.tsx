import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingListService } from "../Services/ShoppingListService";
import { Header } from "../components/Header";
import {ShoppingListDto} from "../Dto/ShoppingListDto"
import {Paths} from "../Routers/paths"
import { Spinner } from "../components/Spinner";

export const ShoppingListDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [shoppingList, setShoppingList] = useState<ShoppingListDto | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      ShoppingListService.getById(parseInt(id))
        .then(setShoppingList)
        .catch(error => console.error("שגיאה בטעינת הסל:", error));
    }
  }, [id]);

if (!shoppingList) return <Spinner />;

  const DeleteCart = async (id:number) => 
  {
    try{
      if (window.confirm("האם אתה בטוח שברצונך למחוק את הסל?")) {
      ShoppingListService.delete(id);
      navigate(`/${Paths.shoppingLists}`)
      }
    }
    catch
    {
      return;
    }
  };

  return (
     <>
     <Header/>
      <div style={{
      position: "fixed",
      top: "120px",    
      left: "150px",   
      zIndex: 1000   
    }}>
    <button id="deleteCart" onClick={() => DeleteCart(shoppingList.id)}>🗑️ מחק</button>
  </div>
    <div className="container">
      <h2>🛒 פרטי הסל: {shoppingList.title}</h2>
      <ul>
        {shoppingList.items?.map(item => (
          <li key={item.barcode}>
          {item.productName} - כמות: {item.quantity}
          </li>
        )) || <p>אין פריטים בסל</p>}
      </ul>
    </div>
    </>
  );
};
         