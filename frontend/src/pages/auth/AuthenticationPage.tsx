import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Paper, Stack } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { LoadingButton } from "@mui/lab";
import PasswordInput from "../../components/form/PasswordInput";
import ToggleTheme from "../../components/shared/ToggleTheme";
import { signIn, signUp } from "../../store/auth/auth-api";

export default function AuthenticationPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const referralCode = searchParams.get("referral-code") as string;

  const { error, isAuthenticating } = useAppSelector((state) => state.auth);
  const isSignUp = location.pathname.split("/")[1] === "register";

  const enterReferralCode = (code?: string) => {
    if (!code) {
      searchParams.set("referral-code", " ");
      setSearchParams(searchParams);
    } else {
      searchParams.set("referral-code", code.replace(" ", ""));
      setSearchParams(searchParams);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              SUBMIT AUTH FORM                              */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (isSignUp) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const form: any = {
        name: data.get("name") as string,
        email: data.get("email") as string,
        password: data.get("password") as string,
      };

      if (referralCode?.length > 2) {
        form.referralCode = referralCode;
      }

      dispatch(signUp(form));
    } else {
      dispatch(
        signIn({
          email: data.get("email") as string,
          password: data.get("password") as string,
        })
      );
      console.log("login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToggleTheme />
      <Stack>
        <Paper elevation={2}>
          <Stack
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack alignItems="center" mb={3}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography> {referralCode} </Typography>
              <Typography
                component="h1"
                variant="h5"
                fontWeight={600}
                color="primary"
              >
                SocialHub
              </Typography>
              <Typography component="h1" variant="h5">
                {isSignUp ? "Sign up" : "Welcome back!"}
              </Typography>
            </Stack>

            <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Stack spacing={2}>
                {isSignUp && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <PasswordInput
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                {!isSignUp && (
                  <Stack alignItems="flex-end">
                    <Link
                      component="button"
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Stack>
                )}
              </Stack>
              {isSignUp && (
                <Stack mt={2}>
                  {referralCode?.length > 0 ? (
                    <TextField
                      label="Referral Code"
                      value={referralCode}
                      onChange={(e) => enterReferralCode(e.target.value)}
                    />
                  ) : (
                    <Link
                      component={"button"}
                      variant="caption"
                      onClick={() => enterReferralCode()}
                    >
                      Have a referral Code?
                    </Link>
                  )}
                  <Stack mt={1}>
                    <Typography variant="caption">
                      By Signing up you agree to{" "}
                      <span>
                        <Link type="button" component="button">
                          Term and conditions
                        </Link>
                      </span>
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <LoadingButton
                size="large"
                loading={isAuthenticating}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isSignUp ? "Sign up" : "Sign in"}
              </LoadingButton>
              {error && <Alert severity="error">{error.toString()}</Alert>}
            </Stack>
            <Grid container>
              <Grid item>
                <Typography variant="body2">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <Link
                    component="button"
                    onClick={() => navigate(isSignUp ? "/login" : "/register")}
                  >
                    &nbsp;
                    {isSignUp ? "Sign in" : "Sign up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
