type SignInForm = {
  email: string;
  password: string;
};

type SignUpForm = SignInForm & {
  name: string;
};

type ForgotPasswordForm = {
  email: string;
};

type ResetPasswordForm = {
  password: string;
  resetPasswordToken: string;
};
type User = {
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  _id: string;
};

type Organization = {
  name: string;
  id: string;
  plan: string;
  domain: string;
  size: number;
  logo: string;
  createdBy: string;
};
type Tokens = {
  accessToken: string;
  refreshToken: string;
};
type AuthResponse = {
  user: User;
  tokens: Tokens;
};
