import { AuthLayout, MainLayout, PrivateRoute } from "@/components";
import { ROUTE_PATHS } from "@/constants";
import {
  Homepage,
  LoginPage,
  PostDetailPage,
  PostSearchPage,
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
            path: ROUTE_PATHS.POST.ROOT,
            children: [
              {
                path: ROUTE_PATHS.POST.DETAIL,
                element: <PostDetailPage />,
              },
              {
                path: ROUTE_PATHS.POST.SEARCH,
                element: <PostSearchPage />,
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
