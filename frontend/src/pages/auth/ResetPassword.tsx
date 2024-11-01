import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { reset_password } from "../../api";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import PasswordInput from "../../components/form/PasswordInput";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Merchant Live
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function ResetPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await reset_password({
        resetPasswordToken: token as string,
        password: password as string,
      });
      if (res?.data) {
        setMessage("Password Reset Successful. Redirecting to login page");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message);
      } else {
        setMessage("An error occured");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={2}>
        <Box
          sx={{
            p: 4,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack alignItems="center" mb={2}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
          </Stack>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <PasswordInput
                required
                fullWidth
                id="email"
                label="New Password"
                name="password"
                autoComplete="password"
              />
              <PasswordInput
                required
                fullWidth
                id="email"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="password"
              />
            </Stack>
            <Link onClick={() => navigate("/login")} variant="body2">
              Login
            </Link>

            <LoadingButton
              size="large"
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </LoadingButton>
            <Typography variant="body2" color="error">
              {message}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
