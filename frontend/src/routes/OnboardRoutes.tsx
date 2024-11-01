import { useAppSelector } from "../store/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const OnboardRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user.user.email) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default OnboardRoutes;
