import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Stack } from "@mui/material";

const OpenRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.user?.email) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Stack>
      <Outlet />
    </Stack>
  );
};

export default OpenRoutes;
