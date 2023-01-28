import { faker } from "@faker-js/faker";
import { IUsers } from "../../types/user.types";
import { handleMistakes } from "../createMistakes/createMistakes";
import { ICreateUser } from "./createUser.interface";

export const createUserData = ({
  locale,
  countRender,
  countMistakes,
}: ICreateUser) => {
  let country = "";
  if (locale === "Russia") {
    country = "Россия";
    faker.locale = "ru";
  } else if (locale === "Poland") {
    country = "Poland";
    faker.locale = "pl";
  } else {
    country = "Great Britain";
    faker.locale = "en_GB";
  }
  
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
