import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FC, useCallback, useEffect } from "react";
import { ILocale } from "./userTable.interface";
import { useAppSelector } from "../../hooks/useSelector";
import { selectUsers } from "../../store/users/userSlice";

export const UserTable: FC<ILocale> = ({ locale, setCountRender, country }) => {
  const users = useAppSelector(selectUsers);

  const handleScroll = useCallback(() => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    scrollHeight - clientHeight - 1 <= scrollTop
      ? setCountRender(true)
      : setCountRender(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <TableContainer>
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
          {users.map((user, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              {country === "Great Britain" ? (
                <>
                  <TableCell align="center">{user.fullName}</TableCell>
                  <TableCell align="center">{user.middleName}</TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">
                    {user.fullName.split(" ")[0]}
                  </TableCell>
                  <TableCell align="center">
                    {user.fullName.split(" ")[1]}
                  </TableCell>
                </>
              )}
              <TableCell align="center">{`${user.address}`}</TableCell>
              <TableCell align="center">{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
