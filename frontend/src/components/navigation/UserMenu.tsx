import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

import { signOut } from "../../store/auth/auth.slice";
import RandomAvatar from "../shared/RandomAvatar";

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      dispatch(signOut());
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };
  return (
    <div>
      <Stack
        sx={{ cursor: "pointer" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              color="text.primary"
            >
              {user.user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.user.role}
            </Typography>
          </Stack>

          {/* {user. ? (
            <Avatar src={user.profilePicUrl} sx={{ height: 50, width: 50 }}>
              {user.name[0].toUpperCase()}
            </Avatar>
          ) : ( */}
          <RandomAvatar size={50} name={user.user.name} />
          {/* )} */}
        </Stack>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/settings?tab=profile")}>
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
