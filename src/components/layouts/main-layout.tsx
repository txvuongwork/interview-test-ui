import type { FunctionComponent } from "react";
import { Outlet } from "react-router";
import { Header } from "./header";

export const MainLayout: FunctionComponent = () => {
  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col">
      <Header />

      <main className="w-full px-4 md:px-10 lg:px-[10%] flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
