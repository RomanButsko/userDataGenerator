import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { faker } from '@faker-js/faker/locale/ru';

const randomName = faker.name.middleName()
console.log(randomName)

export const Seed = () => {
  const [num, setNum] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setNum(Number(e.target.value));
    }
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
        <Button variant="contained" endIcon={<AiOutlineSend />}>
          Send
        </Button>
      </Stack>
    </Box>
  );
};
