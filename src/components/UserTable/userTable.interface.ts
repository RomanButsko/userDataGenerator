import { IPatronymic } from "./../../services/user/patronymic/patronymic.interface";

export interface IUsers {
  id: number;
  fullName: string;
  middleName: string;
  address: IAddress;
  phone: string;
}

export interface ILocale {
  locale: string;
  formSeed?: number;
  patronymic: IPatronymic[];
}

interface IAddress {
  country: string;
  city: string;
  street: string;
  postCode: string;
  houseAdress: string;
}
