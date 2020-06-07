import { useSelector, useDispatch } from "react-redux";
import { setCategoryDisplay } from "../../redux/actions";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ThemeProvider } from "@material-ui/core/styles";
import { THEMES_BY_CATEGORY } from "../../constants";

export default function Cat() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { name, checked } = event.target;
    dispatch(setCategoryDisplay(name, checked));
  };
  console.log(categories);
  return (
    <FormGroup row>
      {Object.keys(categories).map((id) => {
        return (
          <ThemeProvider key={id} theme={THEMES_BY_CATEGORY[id]}>
            <FormControlLabel
              label={categories[id].label}
              control={
                <Switch
                  color="primary"
                  checked={categories[id].displayed}
                  onChange={handleChange}
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
