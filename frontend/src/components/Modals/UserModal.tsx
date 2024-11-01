import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import PasswordInput from "../form/PasswordInput";
import BasicSelect from "../form/BasicSelect";
import { orgRoles } from "../../config/constants";

type UserModalProps = {};
const UserModal = () => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userForm, setUserForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  function handleChange(e: any) {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  async function handleAddUser() {
    try {
    } catch (error) {}
  }
  return (
    <Stack>
      <Button onClick={() => setOpen(true)} variant="contained">
        Add User
      </Button>
      <ModalWrapper
        open={open}
        onClose={() => setOpen(false)}
        title="Add User"
        desc="Add data for the user"
        yesText="Done"
        noText="Close"
        onYes={() => setOpen(false)}
        width={400}
      >
        <Stack spacing={2}>
          <TextField
            size="small"
            label="Name"
            name="name"
            placeholder="Enter user's Name"
            value={userForm.name}
            onChange={handleChange}
          />
          <TextField
            size="small"
            label="User Email"
            placeholder="Enter user's email"
            name="email"
            value={userForm.email}
            onChange={handleChange}
          />
          <PasswordInput
            size="small"
            label="Password"
            placeholder="Enter user's password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
          />
          <BasicSelect
            options={orgRoles}
            fullWidth
            size="small"
            placeholder="Select user's role"
            label="User Role"
            name="role"
            value={userForm.role}
            handleChange={(v) =>
              setUserForm({ ...userForm, role: v.toString() })
            }
          />
        </Stack>
      </ModalWrapper>
    </Stack>
  );
};

export default UserModal;
