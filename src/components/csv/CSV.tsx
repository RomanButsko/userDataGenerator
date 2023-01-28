import { Fab } from "@mui/material";
import Papa from "papaparse";
import { FaFileCsv } from "react-icons/fa";
import { useAppSelector } from "../../hooks/useSelector";
import { selectUsers } from "../../store/users/userSlice";

export const CSVsave = () => {
  const users = useAppSelector(selectUsers);

  const handleCsvSave = () => {
    const csvData = Papa.unparse(users);
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(csvBlob);
    link.download = "data.csv";
    link.click();
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      style={{ position: "fixed", bottom: "2%", right: "2%" }}
      onClick={handleCsvSave}
    >
      <FaFileCsv size={30} />
    </Fab>
  );
};
