import { createMuiTheme, Theme } from "@material-ui/core/styles";

interface Palette {
  primary: {
    main: string;
    light?: string;
    dark?: string;
  };
  secondary: {
    main: string;
    light?: string;
    dark?: string;
  };
}

export default function createTheme(palette: Palette): Theme {
  const theme = createMuiTheme({
    palette,
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
