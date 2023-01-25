import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC, useState } from "react";
import { ISelectCountry } from "./selectCountry.interface";
import axios from "axios";
import { IPatronymic } from "../../services/user/patronymic/patronymic.interface";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Great Britain", "Azerbaijan", "Russia"];

export const SelectCountry: FC<ISelectCountry> = ({
  setLocale,
  setPatronymic,
}) => {
  const [country, setCountry] = useState<string>("Great Britain");

  const handleChange = (event: SelectChangeEvent<typeof country>) => {
    const {
      target: { value },
    } = event;
    setCountry(value);
  };

  const getPatronymic = async () => {
    const response = await axios.get<IPatronymic[]>(
      "https://api.randomdatatools.ru/?count=20&params=FatherName,GenderCode&gender=unset"
    );
    setPatronymic(response.data);
  };

  const handleSelect = async (e: any) => {
    if (e.target.innerText === "Russia") {
      await getPatronymic();
    } else {
      setPatronymic([]);
    }
    setLocale(e.target.innerText);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Select</InputLabel>
        <Select
          value={country}
          onChange={handleChange}
          input={<OutlinedInput label="Country" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} onClick={handleSelect}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
