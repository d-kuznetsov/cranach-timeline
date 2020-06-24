import { createMuiTheme } from "@material-ui/core/styles";
import { PALETTE } from "../constants";

export default function createTheme() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: PALETTE.primary,
      },
      secondary: {
        main: PALETTE.secondary,
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
