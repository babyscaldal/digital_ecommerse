import { FormControl, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ICustomSelectField {
  fullWidth?: boolean;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  name: string;
  width?: string;
  onSelectValueChange?: (value: number) => void;
  onCountryChange?: (data: string[]) => void;
}

export default function CustomSelectField({
  fullWidth,
  width,
  name,
  children,
  label,
}: ICustomSelectField) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur } }) => {
        return (
          <FormControl fullWidth={fullWidth} size="small">
            <Select
              sx={{ width: width ? width : null, backgroundColor: "#fff" }}
              value={value}
              label={label}
              onChange={onChange}
              onBlur={onBlur}
            >
              {children}
            </Select>
          </FormControl>
        );
      }}
    />
  );
}
