import { Categories } from "./redux/types";

interface Category {
  id: number;
  label: string;
  mainColor: string;
}

export const CATEGORIES: { [key: number]: Category } = {
  0: {
    id: 0,
    label: "real",
    mainColor: "#E3C817",
  },
  1: {
    id: 1,
    label: "virtual",
    mainColor: "#E39F17",
  },
};
