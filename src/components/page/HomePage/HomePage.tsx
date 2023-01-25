import { Box, Container } from "@mui/system";
import { Seed } from "../../../ui/Seed/Seed";
import { SelectCountry } from "../../../ui/selectCountry/SelectCountry";
import SliderInput from "../../../ui/slider/Slider";
import Stack from "@mui/material/Stack";
import { UserTable } from "../../UserTable/UserTable";
import { useState } from "react";
import { IPatronymic } from "../../../services/user/patronymic/patronymic.interface";
// import seedrandom from 'seedrandom'

// const myrng = (value: number) => {
//     let res = seedrandom(String(value));
//     console.log(res())
// }
// faker.seed(123);
// let phone = faker.phone.number()
// const fullName = faker.fake({{name.lastName}} {{name.firstName}} {{name.jobTitle}})
// console.log(phone)
// console.log(phone.split(''))
// console.log(phone)

// console.log('1', myrng(1));                // Always 0.2694488477791326
// console.log('2', myrng(2));                // Always 0.7153687886990808
// console.log('3', myrng(3));                // Always 0.8486474710186808
// console.log('4', myrng(4));                // Always 0.35820882139702814
// console.log('1', myrng(1));                // Always 0.2694488477791326

const HomePage = () => {
  const [locale, setLocale] = useState<string>("");
  const [patronymic, setPatronymic] = useState<IPatronymic[]>([]);
  const [formSeed, sendFormSeed] = useState<number>();
  return (
    <>
      <Box
        sx={{
          bgcolor: "rgba(218,213,213, 0.3)",
          height: "100vh",
          paddingTop: "30px",
        }}
      >
        {/* <Container maxWidth="lg"> */}
        <Stack
          direction="row"
          spacing={7}
          justifyContent="center"
          alignItems="center"
        >
          <SelectCountry setLocale={setLocale} setPatronymic={setPatronymic} />
          <SliderInput />
          <Seed sendFormSeed={sendFormSeed} />
        </Stack>
        {/* </Container> */}
        <Container sx={{ marginTop: "40px" }}>
          <UserTable
            locale={locale}
            patronymic={patronymic}
            formSeed={formSeed}
          />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
