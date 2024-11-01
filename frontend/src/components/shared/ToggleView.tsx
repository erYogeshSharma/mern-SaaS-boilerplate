import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const ToggleView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "list";

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    searchParams.set("view", nextView);
    setSearchParams(searchParams);
  };
  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={view}
      exclusive
      color="primary"
      onChange={handleChange}
    >
      <Tooltip title="List View">
        <ToggleButton size="small" value="list" aria-label="list">
          <ViewListIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Module View">
        <ToggleButton size="small" value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default ToggleView;
