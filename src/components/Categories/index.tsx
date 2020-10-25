import { useSelector, useDispatch } from "react-redux";
import { setCategoryDisplay } from "../../redux/actions";
import { RootState, Categories } from "../../redux/types";
import { CATEGORIES } from "../../constants";

import { ThemeProvider, Theme } from "@material-ui/core/styles";
import { createThemeByMainColor } from "../../lib/createTheme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./Categories.module.scss";

const themesByCategory: { [key: number]: Theme } = {};
Object.entries(CATEGORIES).forEach(([key, { mainColor }]) => {
  themesByCategory[+key] = createThemeByMainColor(mainColor);
});

export function CategoryContainer() {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key, checked } = e.target;
    dispatch(setCategoryDisplay(+key, checked));
  };
  return <CategoryComponent categories={categories} onChange={handleCategoryChange} />;
}

interface Props {
  categories: Categories;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CategoryComponent({ categories, onChange }: Props) {
  return (
    <div className={styles.container}>
      {Object.entries(categories).map(([id, { label, displayed }]) => {
        return (
          <ThemeProvider key={id} theme={themesByCategory[+id]}>
            <FormControlLabel
              label={label}
              control={
                <Checkbox color="primary" checked={displayed} onChange={onChange} name={id} />
              }
            />
          </ThemeProvider>
        );
      })}
    </div>
  );
}
