import { Input, Slider } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ISlider } from "./slider.interface";

const SliderInput: FC<ISlider> = ({ setCountMistake }) => {
  const [value, setValue] = useState<number | string | Array<number | string>>(
    0
  );

  useEffect(() => {
    if (value !== '') {
      const timer = setTimeout(() => {
        setCountMistake(+value);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [value]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = Number(event.target.value);
    if (currentValue > 1000) currentValue = 1000;
    setValue(event.target.value === "" ? 0 : currentValue);
  };
  const handleBlur = (event: any) => {
    if (value < 0) setValue(0);
    else if (value > 10) setValue(event.target.value);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Number of mistakes
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            defaultValue={0}
            step={0.5}
            min={0}
            max={10}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item>
          <Input
            value={value === 0 ? '' : value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.5,
              min: 0,
              max: 1000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SliderInput;
