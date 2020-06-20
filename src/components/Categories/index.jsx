import { useSelector, useDispatch } from "react-redux";
import { setCategoryDisplay } from "../../redux/actions";

import PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ThemeProvider } from "@material-ui/core/styles";
import { THEMES_BY_CATEGORY } from "../../constants";

import Checkbox from "@material-ui/core/Checkbox";

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
    <FormGroup row>
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
    </FormGroup>
  );
}

CategoryComponent.propTypes = {
  categories: PropTypes.object,
  onChange: PropTypes.func,
};
