import { useSelector, useDispatch } from "react-redux";
import { setCategoryDisplay } from "../../redux/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./Categories.module.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import { createThemeByMainColor } from "../../lib/createTheme";
import { CATEGORIES } from "../../constants";

const THEMES_BY_CATEGORY = {};
Object.keys(CATEGORIES).forEach((key) => {
  THEMES_BY_CATEGORY[key] = createThemeByMainColor(CATEGORIES[key].mainColor);
});

export function CategoryContainer() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    dispatch(setCategoryDisplay(name, checked));
  };
  return <CategoryComponent categories={categories} onChange={handleCategoryChange} />;
}

interface Props {
  categories: {
    id: number;
    label: string;
    displayed: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CategoryComponent({ categories, onChange }: Props) {
  return (
    <div className={styles.container}>
      {Object.keys(categories).map((id) => {
        return (
          <ThemeProvider key={id} theme={THEMES_BY_CATEGORY[id]}>
            <FormControlLabel
              label={categories[id].label}
              control={
                <Checkbox
                  color="primary"
                  checked={categories[id].displayed}
                  onChange={onChange}
                  name={id}
                />
              }
            />
          </ThemeProvider>
        );
      })}
    </div>
  );
}
