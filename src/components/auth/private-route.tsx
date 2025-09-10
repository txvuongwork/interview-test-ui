import { APP_CONFIG, ROUTE_PATHS } from "@/constants";
import { useGetProfile } from "@/services";
import { type FunctionComponent, type PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const PrivateRoute: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { data: profileResponse, isPending, isFetching } = useGetProfile();

  const token = localStorage.getItem(APP_CONFIG.ACCESS_TOKEN_KEY);

  if (!token) {
    return <Navigate to={ROUTE_PATHS.AUTH.LOGIN} replace />;
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-postvibe-purple"></div>
      </div>
    );
  }

  if (!isFetching && !profileResponse?.ok) {
    localStorage.removeItem(APP_CONFIG.ACCESS_TOKEN_KEY);
    return <Navigate to={ROUTE_PATHS.AUTH.LOGIN} replace />;
  }

  return children;
};
