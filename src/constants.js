import { createThemeByMainColor } from "./lib/createTheme";

export const PERIOD_MIN_VALUE = 1472;
export const PERIOD_MAX_VALUE = 1586;

export const CATEGORIES = {
  1: {
    id: 1,
    label: "real",
    mainColor: "#EBCF3B",
  },
  2: {
    id: 2,
    label: "virtual",
    mainColor: "#0CEB6F",
  },
  /*
  1: {
    id: "painting",
    label: "Gemälde",
    mainColor: "#BEDE2F",
  },
  2: {
    id: "drawing",
    label: "Zeichnungen",
    mainColor: "#5BDADE",
  },
  3: {
    id: "print",
    label: "Drucke",
    mainColor: "#9E2FDE",
  },
  4: {
    id: "archive",
    label: "Archivalien",
    mainColor: "#DE793A",
  },
  */
};

export const THEMES_BY_CATEGORY = {};
Object.keys(CATEGORIES).forEach((key) => {
  THEMES_BY_CATEGORY[key] = createThemeByMainColor(CATEGORIES[key].mainColor);
});
