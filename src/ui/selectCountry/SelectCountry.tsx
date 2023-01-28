import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC } from "react";
import { ISelectCountry } from "./selectCountry.interface";
import { useDispatch } from "react-redux";
import { updateUsers } from "../../store/users/userSlice";

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

const names = ["Great Britain", "Poland", "Russia"];

export const SelectCountry: FC<ISelectCountry> = ({
  setLocale,
  country,
  setCountry,
  setCounterRender,
  setCountMistakes,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof country>) => {
    const {
      target: { value },
    } = event;
    setCountry(value);
  };

  const dispatch = useDispatch();

  const changeLocation = (data: string) => {
 
  }

  const handleSelect = (name: string) => {
    let newCountry = name === 'Great Britain' ? 'en_GB' : name === 'Poland' ? 'pl' : name === 'Russia' ? 'ru' : 'en_GB';
    setLocale(newCountry);
    setCounterRender(20);
    setCountMistakes(0);
    dispatch(updateUsers([]));
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
            <MenuItem key={name} value={name} onClick={() => handleSelect(name)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
