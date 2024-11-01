import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSearchParams } from "react-router-dom";
import { Divider, Stack } from "@mui/material";

type NavTabProps = {
  selector?: string;
  options: {
    icon: JSX.Element;
    label: string;
    value: string;
  }[];
};
export default function NavTabs({ selector = "tab", options }: NavTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(selector) || "0";

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    searchParams.set(selector, newValue.toString());
    setSearchParams(searchParams);
  };

  return (
    <Stack>
      <Tabs
        scrollButtons="auto"
        value={value}
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChange}
        aria-label="icon position tabs example"
      >
        {options &&
          options.map((option, index) => (
            <Tab
              icon={option.icon}
              key={index}
              value={option.value}
              iconPosition="start"
              label={option.label}
            />
          ))}
      </Tabs>
      <Divider />
    </Stack>
  );
}
