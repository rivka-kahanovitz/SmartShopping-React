import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";

export const BestStorePage = () => {
  const location = useLocation();
  const { storeName, branchName, address, total } = location.state || {};

  if (!storeName) return <p>לא נמצאו נתונים</p>;

  return (
    <>
      <Header />
      <div className="container">
        <h2>החנות הזולה ביותר</h2>
        <p><strong>שם החנות:</strong> {storeName}</p>
        <p><strong>שם הסניף:</strong> {branchName}</p>
        <p><strong>כתובת:</strong> {address}</p>
        <p><strong>סכום כולל:</strong> ₪{total}</p>
      </div>
    </>
  );
};
