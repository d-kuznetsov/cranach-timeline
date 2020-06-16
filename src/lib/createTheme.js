import { createMuiTheme } from "@material-ui/core/styles";

export default function createTheme() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#FAC725",
      },
    },
  });
  return theme;
}

export function createThemeByMainColor(color) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });
  return theme;
}
