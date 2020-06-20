import { useSelector, useDispatch } from "react-redux";
import { setCategoryDisplay } from "../../redux/actions";

import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./Categories.module.scss";

import { THEMES_BY_CATEGORY } from "../../constants";

export function CategoryContainer() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    dispatch(setCategoryDisplay(name, checked));
  };
  return <CategoryComponent categories={categories} onChange={handleCategoryChange} />;
}

export function CategoryComponent({ categories, onChange }) {
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

CategoryComponent.propTypes = {
  categories: PropTypes.object,
  onChange: PropTypes.func,
};
