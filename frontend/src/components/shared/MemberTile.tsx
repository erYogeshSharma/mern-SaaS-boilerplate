import { Chip, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import BasicSelect from "../form/BasicSelect";
import { LoadingButton } from "@mui/lab";
import { inviteStatus, orgRoles } from "../../config/constants";

const MemberInvite = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <TextField size="small" sx={{ flexGrow: 1 }} label="Member Email" />
      <BasicSelect size="small" options={orgRoles} value="member" />
      <LoadingButton variant="contained">Invite</LoadingButton>
    </Stack>
  );
};
type InviteStatus = keyof typeof inviteStatus;

const member: { email: string; role: string; status: InviteStatus } = {
  email: "er.yogesh505@gmail.com",
  role: "this is a role  ",
  status: "accepted",
};
const MemberTile = () => {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack>
        <Typography variant="body1"> {member.email} </Typography>
        <Typography variant="body2"> {member.role} </Typography>
      </Stack>
      <Chip
        label={member.status}
        color={inviteStatus[member?.status].color || "default"}
      />
    </Stack>
  );
};

export default MemberTile;
