import type { FunctionComponent } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./header";
import { useEffect, useRef } from "react";

export const MainLayout: FunctionComponent = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current && !location.hash) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col">
      <Header />

      <main
        ref={mainRef}
        className="w-full px-4 md:px-10 lg:px-[10%] flex-1 overflow-y-auto flex flex-col"
      >
        <Outlet />
      </main>
    </div>
  );
};
