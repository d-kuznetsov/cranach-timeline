import { useSelector, useDispatch } from "react-redux";
import { setCategoryDisplay } from "../../redux/actions";
import { RootState, Categories } from "../../redux/types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./Categories.module.scss";

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
          <FormControlLabel
            key={id}
            label={label}
            control={
              <Checkbox color="secondary" checked={displayed} onChange={onChange} name={id} />
            }
          />
        );
      })}
    </div>
  );
}
