import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type RadioGroupProps = RadioProps & {
  handleChange: (value: string | number) => void;
  options: {
    value: number | string;
    label: string;
  }[];
  value: string | number;
  label: string;
};
export default function RadioButtonsGroup({
  options,
  value,
  handleChange,
  ...props
}: RadioGroupProps) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{props.label}</FormLabel>
      <RadioGroup
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={value}
        name="radio-buttons-group"
      >
        {options &&
          options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}
