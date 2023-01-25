import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FC, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { ISeed } from "./seed.interface";

export const Seed: FC<ISeed> = ({ sendFormSeed }) => {
  const [num, setNum] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setNum(Number(e.target.value));
    }
  };

  const handleSend = () => {
    sendFormSeed(num);
  };

  return (
    <Box component="form">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <TextField
          type="text"
          id="outlined-basic"
          variant="outlined"
          onChange={handleChange}
          value={num}
        />
        <Button
          variant="contained"
          endIcon={<AiOutlineSend />}
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
};
