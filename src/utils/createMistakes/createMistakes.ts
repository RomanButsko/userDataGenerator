import { IUsers } from "./../../types/user.types";
import { faker } from "@faker-js/faker";
import { alphabet_GB, alphabet_PL, alphabet_RU, nums } from "./alphabetNums";

const Limits = {
  id: 10,
  fullName: 8,
  middleName: 10,
  address: 120,
  phone: 30,
};

const randomProperty = (): keyof IUsers => {
  const properties: (keyof IUsers)[] = [
    "id",
    "fullName",
    "middleName",
    "address",
    "phone",
  ];
  const result: keyof IUsers =
    properties[faker.datatype.number({ min: 0, max: properties.length - 1 })];
  return result;
};

const createMistake = [
  (data: string) => {
    const randomLetter = faker.datatype.number({
      min: 0,
      max: data.length - 2,
    });
    return data.substring(0, randomLetter) + data.substring(randomLetter + 1);
  },
  (data: string) => {
    if (data.length < 2) return data;
    const randomLetter = faker.datatype.number({
      min: 0,
      max: data.length - 2,
    });
    let arrData = data.split("");
    let lastValue = arrData[randomLetter];
    arrData[randomLetter] = arrData[randomLetter + 1];
    arrData[randomLetter + 1] = lastValue;
    return arrData.join("");
  },
  (data: string) => {
    let isNumber = /^[\d\s()-]+$/.test(data.replace(/\s/g, ""));
    if (isNumber) {
      let randomPlace = faker.datatype.number({ min: 0, max: data.length - 1 });
      let newLetter = faker.datatype.number({ min: 0, max: nums.length - 1 });
      return (
        data.substring(0, randomPlace) +
        nums[newLetter] +
        data.substring(randomPlace)
      );
    } else {
      let randomPlace = faker.datatype.number({
        min: 0,
        max: data.length,
      });
      let newLetter = faker.datatype.number({
        min: 0,
        max:
          faker.locale === "en_GB"
            ? alphabet_GB.length - 1
            : faker.locale === "ru"
            ? alphabet_RU.length - 1
            : alphabet_PL.length - 1,
      });
      return (
        data.substring(0, randomPlace) +
        (faker.locale === "en_GB"
          ? alphabet_GB[newLetter]
          : faker.locale === "ru"
          ? alphabet_RU[newLetter]
          : alphabet_PL[newLetter]) +
        data.substring(randomPlace)
      );
    }
  },
];

export const handleMistakes = (user: IUsers, mistakes: number = 0): IUsers => {
  for (let i = 0; i < mistakes; i++) {
    if (mistakes === 1) break;
    let lastOperation = mistakes % 1;
    if (lastOperation === 0.5) {
      if (Math.random() < 0.5) mistakes = 1;
      else break;
    }
    const property = randomProperty();
    let min = 0;
    let max = 2;
    if (user[property].length > Limits[property]) max = 1;
    if (user[property].length <= 1) min = 1;
    user[property] = createMistake[faker.datatype.number({ min, max })](
      user[property]
    );
  }
  return user;
};
