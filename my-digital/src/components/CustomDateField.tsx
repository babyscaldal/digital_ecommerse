import { Controller, useFormContext } from "react-hook-form";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormHelperText } from "@mui/material";

interface ICustomDateField {
  name: string;
}

export default function CustomDateField({ name }: ICustomDateField) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
              <DateField
                // minDate={today}
                format="MM/YYYY"
                fullWidth
                size="small"
                label="Select Date"
                value={value}
                onChange={onChange}
              />
              {error && (
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {error.message}
                </FormHelperText>
              )}
            </>
          </LocalizationProvider>
        );
      }}
    />
  );
}
