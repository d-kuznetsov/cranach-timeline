interface Category {
  id: number;
  label: string;
  mainColor: string;
}

export const CATEGORIES: { [key: number]: Category } = {
  1: {
    id: 1,
    label: "graphics",
    mainColor: "dark",
  },
  2: {
    id: 2,
    label: "paintings",
    mainColor: "light",
  },
};

export const PERIOD_MIN_VALUE = 1490;
export const PERIOD_MAX_VALUE = 1586;

export const PRIMARY_COLOR = "#FAC725";
export const SECONDARY_COLOR = "#A8A8A8";
