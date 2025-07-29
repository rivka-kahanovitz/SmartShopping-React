import { useEffect, useState } from "react";
import { ProductService } from "../Services/ProductService";
import { ProductDto } from "../Dto/ProductDto";
import { ShoppingListService } from "../Services/ShoppingListService";
import { jwtDecode } from "jwt-decode";
import { PriceComparisonService } from "../Services/PriceComparisonService";
import { useNavigate } from "react-router-dom";
import { Paths } from "../Routers/paths";
import { Header } from "../components/Header";

interface CartItem {
  product: ProductDto;
  quantity: number;
}

interface MyToken {
  id: string;
}

export const ProductPage = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [title, setTitle] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getAll()
      .then(setProducts)
      .catch(err => console.error("שגיאה בטעינת מוצרים", err));
  }, []);

  const handleSelectProduct = (product: ProductDto) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.barcode === product.barcode);
      if (existing) {
        return prevCart.map(item =>
          item.product.barcode === product.barcode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (barcode: string, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.barcode === barcode
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  function getUserIdFromToken(): string | null {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<MyToken>(token);
      return decoded.id;
    } catch (e) {
      console.error("שגיאה בפענוח הטוקן:", e);
      return null;
    }
  }

  const handleCheckout = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("לא נמצאה התחברות");
      return;
    }

    if (!title.trim()) {
      alert("נא להזין כותרת לעגלה");
      return;
    }

    const shoppingList = {
      title,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        barcode: item.product.barcode,
        price: item.product.price,
        quantity: item.quantity
      }))
    };

    try {
      await ShoppingListService.saveShoppingList(shoppingList);

      const comparisonData = {
        items: cart.map(item => ({
          barcode: item.product.barcode,
          quantity: item.quantity
        }))
      };

      const result = await PriceComparisonService.findBestStore(comparisonData);

      navigate(`/${Paths.BestStorePage}`, {
        state: {
          storeName: result.storeName,
          branchName: result.branchName,
          address: result.address,
          total: result.totalPrice
        }
      });

      setCart([]);
      setTitle("");
    } catch (error) {
      console.error("שגיאה בסיום קנייה", error);
      alert("אירעה שגיאה במהלך סיום הקנייה");
    }
  };

 return (
  <>
    <Header />

    <div className="product-page-wrapper container">
      {/* עמודת מוצרים */}
      <div className="products-grid">
        <h2>בחר מוצר לסל</h2>

        <input
          type="text"
          value={title}
          placeholder="שם הסל שלך"
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "15px", display: "block" }}
        />

        {products.map((product) => (
          <div key={product.barcode} className="product-card">
            <img
              src={`/Images/${product.barcode}.jpg`}
              alt={product.name}
              onClick={() => handleSelectProduct(product)}
            />
            <p>{product.name}</p>
            {cart.find((item) => item.product.barcode === product.barcode) && (
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(product.barcode, -1)}>-</button>
                <span>
                  {cart.find((item) => item.product.barcode === product.barcode)?.quantity}
                </span>
                <button onClick={() => updateQuantity(product.barcode, 1)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* עמודת סיכום – הסל */}
      <div className="cart-summary">
        <h3>🛒 סל נוכחי</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.product.barcode} style={{ display: "flex", alignItems: "center" }}>
          <img 
            src={`/Images/${item.product.barcode}.jpg`} 
            alt={item.product.name} 
            style={{ width: "40px", height: "40px", marginRight: "10px", objectFit: "cover" }}
          />
          {item.product.name} × {item.quantity}
        </li>           
          ))}
        </ul>
        <button onClick={handleCheckout} className="checkout-btn">
          סיום קנייה
        </button>
      </div>
    </div>
  </>
);

};
