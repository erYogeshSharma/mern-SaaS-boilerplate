import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Divider, IconButton, Stack } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
};
type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  desc: string;
  yesText?: string;
  noText?: string;
  onYes?: () => void;
  width?: number;
};
export default function ModalWrapper({
  open = true,
  onClose,
  children,
  title = "Modal",
  desc = "Modal Description",
  yesText = "Done",
  noText = "Close",
  onYes,
  width = 400,
}: ModalProps) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={{ ...style, width: width }}>
          <Stack spacing={2}>
            <Stack
              pt={1}
              px={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack>
                <Typography variant="h6">{title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {desc}
                </Typography>
              </Stack>
              <IconButton onClick={onClose}>
                <CancelOutlined />
              </IconButton>
            </Stack>
            <Stack px={2}>{children}</Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              px={2}
              pb={1}
            >
              <Button onClick={onClose} variant="outlined">
                {noText}
              </Button>
              <Button onClick={onYes} variant="contained">
                {yesText}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
