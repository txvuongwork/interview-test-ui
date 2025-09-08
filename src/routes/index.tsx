import { AuthLayout } from "@/components";
import { ROUTE_PATHS } from "@/constants";
import { LoginPage } from "@/pages";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    children: [
      {
        path: ROUTE_PATHS.AUTH.ROOT,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTE_PATHS.AUTH.LOGIN,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
