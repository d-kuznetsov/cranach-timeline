import { Categories } from "./redux/types";

interface Category {
  id: number;
  label: string;
  mainColor: string;
}

export const CATEGORIES: { [key: number]: Category } = {
  1: {
    id: 1,
    label: "real",
    mainColor: "#E3C817",
  },
  2: {
    id: 2,
    label: "virtual",
    mainColor: "#E39F17",
  },
};
