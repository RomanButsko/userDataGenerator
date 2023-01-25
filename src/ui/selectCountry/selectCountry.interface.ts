import { IPatronymic } from "./../../services/user/patronymic/patronymic.interface";
export interface ISelectCountry {
  setLocale: (value: string) => void;
  setPatronymic: (value: IPatronymic[]) => void;
}
