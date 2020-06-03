import { createMuiTheme } from "@material-ui/core/styles";

export default function createTheme() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ffa10d",
      },
      secondary: {
        main: "#00ffee",
      },
    },
  });
  return theme;
}
