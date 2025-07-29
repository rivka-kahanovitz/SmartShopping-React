import { Link } from "react-router-dom";
import "../App.css";
import {Paths} from "../Routers/paths";
import { UserBadge } from "./UserBadge";
export const Header = () => {
  return (
    <header className="header">
      <div>
        <h1 style={{ margin: 0, fontWeight: "bold" }}>SmartShopping</h1>
        <div style={{ fontSize: "14px", fontWeight: "500", marginTop: "-6px" }}>
          קניות עושים חכם
        </div>
      </div>

      <nav>
        <Link to={`/${Paths.home}`}>דף הבית</Link>
        <Link to={`/${Paths.users}`}>החשבון שלי</Link>
        <Link to={`/${Paths.shoppingLists}`}>סל הקניות</Link>

        <UserBadge />
      </nav>
    </header>
  );
};
