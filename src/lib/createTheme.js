import { createMuiTheme } from "@material-ui/core/styles";

export default function createTheme() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#EA3222",
      },
      secondary: {
        main: "#08172A",
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
