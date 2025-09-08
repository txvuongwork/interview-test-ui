import type { FunctionComponent } from "react";
import { RouterProvider } from "react-router";
import { routes } from "@/routes";

export const App: FunctionComponent = () => {
  return <RouterProvider router={routes} />;
};
