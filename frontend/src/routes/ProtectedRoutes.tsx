import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import DashboardWrapper from "../components/navigation/DashboardWrapper";

const ProtectedRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user?.user?.email) {
    return <Navigate to="/login" />;
  }
  return (
    <DashboardWrapper>
      <Outlet />
    </DashboardWrapper>
  );
};

export default ProtectedRoutes;
