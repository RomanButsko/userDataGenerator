import axios from "axios";
import { IPatronymic } from "./patronymic.interface";

export const User = {
  async getPatronymic() {
    const response = await axios.get<IPatronymic[]>(
      "https://api.randomdatatools.ru/?count=100&params=FatherName,GenderCode&gender=unset"
    );
    return response.data;
  },
};
