import { FormControl, FormHelperText, Rating } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface ICustomRate {
  name: string;
}

export default function CustomRate({ name }: ICustomRate) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl
            fullWidth
            size="small"
            sx={{
              bgcolor: "#fff",
              borderRadius: "4px",
            }}
            variant="outlined"
          >
            <Rating
              size="small"
              name="simple-controlled"
              value={Number(value)}
              onChange={onChange}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
