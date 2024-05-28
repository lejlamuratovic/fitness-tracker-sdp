import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#72A1BF",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff0000",
    },
    text: {
      primary: "#333333", // dark gray for primary text
      secondary: "#757575", // gray for secondary text
    },
  },
});

export default theme;
