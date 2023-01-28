import { faker } from "@faker-js/faker";
import { IUsers } from "../../types/user.types";
import { handleMistakes } from "../createMistakes/createMistakes";
import { ICreateUser } from "./createUser.interface";

export const createUserData = ({
  locale,
  countRender,
  countMistakes,
}: ICreateUser) => {
  console.log('locale', locale)
  faker.setLocale(locale)
  let country = locale === "ru" ? "Россия" : locale === 'pl' ? 'Poland' : 'Great Britain';

  let users: IUsers[] = [];

  Array.from({ length: countRender }).forEach(() => {
    const userData = {
      id: String(faker.datatype.number({ max: 100000 })),
      fullName: faker.name.fullName(),
      middleName: locale !== "Russia" ? faker.name.middleName() : "",
      address:
        country +
        " " +
        faker.address.city() +
        " " +
        faker.address.streetAddress() +
        " " +
        faker.address.secondaryAddress() +
        " " +
        faker.address.zipCode(),
      phone: String(faker.phone.number()),
    };
    users.push(userData);
  });
  if (countMistakes) {
    users.map((user) => {
      return handleMistakes(user, countMistakes);
    });
  }
  return users;
};
