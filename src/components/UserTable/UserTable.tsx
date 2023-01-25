import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { faker } from "@faker-js/faker";
import { FC } from "react";
import { ILocale, IUsers } from "./userTable.interface";
import { IPatronymic } from "../../services/user/patronymic/patronymic.interface";

function sendSeed(
  seed: number | null = null,
  locale: string,
  middleN: IPatronymic | null = null
) {
  let country = "";
  if (locale === "Russia") {
    country = "Россия";
    faker.locale = "ru";
  } else if (locale === "Azerbaijan") {
    country = "Azerbaijan";
    faker.locale = "uk";
  } else {
    country = "Great Britain";
    faker.locale = "en_GB";
  }

  if (seed) {
    faker.seed(seed);
  }

  const userData = {
    id: faker.datatype.number({ max: 100000 }),
    fullName: middleN
      ? faker.name.fullName({
          sex: middleN.GenderCode === "man" ? "male" : "female",
        })
      : faker.name.fullName(),
    middleName: middleN ? middleN.FatherName : faker.name.middleName(),
    address: {
      country,
      city: faker.address.city(),
      street: faker.address.secondaryAddress(),
      postCode: faker.address.zipCode(),
      houseAdress: faker.address.streetAddress(),
    },
    phone: faker.phone.number(),
  };
  return userData;
}

export const UserTable: FC<ILocale> = ({ locale, patronymic, formSeed }) => {
  let user: IUsers[] = [];
  console.log("l", locale);
  Array.from({ length: 20 }).forEach(() => {
    const data = sendSeed(null, locale, patronymic.pop());
    user.push(data);
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>N</TableCell>
            <TableCell>Id</TableCell>
            {locale !== "Azerbaijan" ? (
              <>
                <TableCell align="center">FullName</TableCell>
                <TableCell align="center">MiddleName</TableCell>
              </>
            ) : (
              <>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Surname</TableCell>
              </>
            )}
            <TableCell align="center">Adress</TableCell>
            <TableCell align="center">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">{index + 1}</TableCell>
              <TableCell component="th" scope="row">{user.id}</TableCell>
              {locale !== "Azerbaijan" ? (
                <>
                  <TableCell align="center">{user.fullName}</TableCell>
                  <TableCell align="center">{user.middleName}</TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">{user.fullName.split(" ")[0]}</TableCell>
                  <TableCell align="center">{user.fullName.split(" ")[1]}</TableCell>
                </>
              )}
              <TableCell align="center">{`${user.address.country}, ${user.address.city}, ${user.address.houseAdress}, ${user.address.street}, - ${user.address.postCode}`}</TableCell>
              <TableCell align="center">{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
