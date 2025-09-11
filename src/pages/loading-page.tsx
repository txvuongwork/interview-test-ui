import type { FunctionComponent } from "react";

export const LoadingPage: FunctionComponent = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-postvibe-purple"></div>
  </div>
);
