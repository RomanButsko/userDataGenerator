import { Box, Container } from "@mui/system";
import { Seed } from "../../../ui/Seed/Seed";
import { SelectCountry } from "../../../ui/selectCountry/SelectCountry";
import SliderInput from "../../../ui/slider/Slider";
import Stack from "@mui/material/Stack";
import { UserTable } from "../../UserTable/UserTable";
import { useEffect, useState } from "react";
import { createUserData } from "../../../utils/createUserData/createUser";
import { addUsers, updateUsers } from "../../../store/users/userSlice";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { faker } from "@faker-js/faker";
import { CSVsave } from "../../csv/CSV";

const HomePage = () => {
  const [userData, setUserData] = useState({
    locale: "en_GB",
    formSeed: 0,
    country: "Great Britain",
    countRender: 20,
    countMistakes: 0,
    render: false,
  });

  const { locale, formSeed, country, countRender, countMistakes, render } =
    userData;

  const dispatch = useAppDispatch();

  useEffect(() => {
    faker.seed(formSeed);
    const data = createUserData({
      locale,
      countRender,
      countMistakes,
    });
    dispatch(updateUsers(data));
  }, [countMistakes, locale, formSeed, country]);

  useEffect(() => {
    if (render) {
      let newCountRender = 10;
      const data = createUserData({
        locale,
        countRender: newCountRender,
        countMistakes,
      });
      dispatch(addUsers(data));
    }
  }, [render]);

  return (
    <>
      <Box
        sx={{
          bgcolor: "rgba(218,213,213, 0.3)",
          minHeight: "100%",
          paddingTop: "30px",
        }}
      >
        <Stack
          direction="row"
          spacing={7}
          justifyContent="center"
          alignItems="center"
        >
          <SelectCountry
            setCountry={(value) =>
              setUserData((prev) => ({ ...prev, country: value }))
            }
            country={country}
            setLocale={(value) =>
              setUserData((prev) => ({ ...prev, locale: value }))
            }
            setCounterRender={(value) =>
              setUserData((prev) => ({ ...prev, countRender: value }))
            }
            setCountMistakes={(value) =>
              setUserData((prev) => ({ ...prev, countMistakes: value }))
            }
          />
          <SliderInput
            setCountMistake={(value) =>
              setUserData((prev) => ({ ...prev, countMistakes: value }))
            }
          />
          <Seed
            sendFormSeed={(value) =>
              setUserData((prev) => ({ ...prev, formSeed: value }))
            }
          />
        </Stack>
        <Container sx={{ marginTop: "40px" }}>
          <UserTable
            locale={locale}
            country={country}
            setCountRender={(value) =>
              setUserData((prev) => ({ ...prev, render: value }))
            }
          />
          <CSVsave />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
