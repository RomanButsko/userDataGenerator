import { Box, Container } from "@mui/system";
import { Seed } from "../../../ui/Seed/Seed";
import { SelectCountry } from "../../../ui/selectCountry/SelectCountry";
import SliderInput from "../../../ui/slider/Slider";
import Stack from "@mui/material/Stack";
import { UserTable } from '../../UserTable/UserTable';

const HomePage = () => {
  return (
    <>
      <Box sx={{ bgcolor: "rgba(218,213,213, 0.3)", height: "100vh", paddingTop: "30px"}}>
        {/* <Container maxWidth="lg"> */}
        <Stack
          direction="row"
          spacing={7}
          justifyContent="center"
          alignItems="center"
        >
          <SelectCountry />
          <SliderInput />
          <Seed />
        </Stack>
        {/* </Container> */}
        <Container sx={{ marginTop:"40px"}}>
        <UserTable />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
