import { Box, Stack } from "@mui/material";
import AuthenticationPage from "./AuthenticationPage";

const AuthPage = () => {
  return (
    <Box>
      <Stack
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <AuthenticationPage />
      </Stack>
    </Box>
  );
};

export default AuthPage;
