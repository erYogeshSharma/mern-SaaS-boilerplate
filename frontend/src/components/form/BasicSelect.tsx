import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";

type BasicSelectProps = SelectProps & {
  handleChange: (value: string | number) => void;
  options: {
    value: number | string;
    label: string;
  }[];
  value: string | number;
};
export default function BasicSelect({
  options,
  handleChange,
  value = "",
  ...props
}: BasicSelectProps) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth={props.fullWidth} size={props.size}>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          {...props}
          value={value}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => handleChange(e.target.value as string)}
        >
          {options &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
