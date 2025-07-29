import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { Paths } from "./paths";
import { HomePage } from "../Pages/HomePage";
import { LoginPage } from "../Pages/LoginPage";
import { ShoppingListsPage } from "../Pages/ShoppingListPage";
import { SignUpPage } from "../Pages/SignUpPage";
import { UsersPage } from "../Pages/UsersPage";
import { ProductPage } from "../Pages/ProductPage";
import { BestStorePage } from "../Pages/BestStorePage";
import { ShoppingListDetailsPage } from "../Pages/ShoppingListDetailsPage";
import { ForgotPasswordPage } from "../Pages/ForgotPassworPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: Paths.home,
      element: <HomePage />,
    },
    {
      path: Paths.login,
      element: <LoginPage />,
    },
    {
      path: Paths.signup,
      element: <SignUpPage />,
    },
    {
      path: Paths.users,
      element: <UsersPage />,
    },
    {
        path: `${Paths.shoppingLists}/:id`,
        element: <ShoppingListDetailsPage />,
    },
    {
        path: Paths.shoppingLists,
        element: <ShoppingListsPage />,
    },
    {
      path: Paths.ProductPage,
      element: <ProductPage />,
    },
    {
      path: Paths.BestStorePage,
      element: <BestStorePage />,
    },
    {
      path: Paths.forgotPassword,
      element: <ForgotPasswordPage />,
    },
    {
      index: true,
      element: <Navigate to={Paths.home} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
