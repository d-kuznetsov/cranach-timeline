import { createMuiTheme, Theme } from "@material-ui/core/styles";
const PALETTE = {
  primary: "#FAC725",
  secondary: "#A8A8A8",
};

export default function createTheme(): Theme {
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

export function createThemeByMainColor(color: string): Theme {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });
  return theme;
}
