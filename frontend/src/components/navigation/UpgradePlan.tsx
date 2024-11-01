import { Button, Paper, Stack, Typography } from "@mui/material";

const UpgradeToPro = () => {
  return (
    <Stack p={1}>
      <Paper variant="outlined">
        <Stack p={1} spacing={2}>
          <Stack>
            <Typography color="primary" variant="body1" fontWeight={600}>
              Upgrade to pro
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              color="text.secondary"
            >
              You trial will expired in 7 Days upgrade now
            </Typography>
          </Stack>
          <Button variant="contained">Upgrade</Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default UpgradeToPro;
