import { App } from "@/App.tsx";
import { Toaster } from "@/components";
import "@/config/i18n";
import { queryClient } from "@/config/react-query";
import "@/index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        duration={2000}
        position="bottom-right"
        closeButton={false}
        richColors
      />
    </QueryClientProvider>
  </StrictMode>
);
