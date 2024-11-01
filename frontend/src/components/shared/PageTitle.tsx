import { Stack, Typography } from "@mui/material";
import React from "react";

type PageTitleProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};
const PageTitle = (props: PageTitleProps) => {
  return (
    <Stack>
      <Stack
        mb={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack>
          <Typography variant="h5" color="text.primary" fontWeight={600}>
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {props.subtitle}
          </Typography>
        </Stack>
        {props.children}
      </Stack>
    </Stack>
  );
};

export default PageTitle;
