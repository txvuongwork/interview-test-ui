import { AuthLayout, MainLayout, PrivateRoute } from "@/components";
import { ROUTE_PATHS } from "@/constants";
import {
  Homepage,
  LoginPage,
  BlogDetailPage,
  BlogSearchPage,
  RegisterPage,
} from "@/pages";
import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    children: [
      {
        path: ROUTE_PATHS.ROOT,
        element: (
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Homepage />,
          },
          {
            path: ROUTE_PATHS.BLOG.ROOT,
            children: [
              {
                path: ROUTE_PATHS.BLOG.DETAIL,
                element: <BlogDetailPage />,
              },
              {
                path: ROUTE_PATHS.BLOG.SEARCH,
                element: <BlogSearchPage />,
              },
            ],
          },
        ],
      },
      {
        path: ROUTE_PATHS.AUTH.ROOT,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTE_PATHS.AUTH.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTE_PATHS.AUTH.REGISTER,
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
