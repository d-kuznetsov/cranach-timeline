import { useSelector, useDispatch } from "react-redux";
import { setTextToSearch } from "../../redux/actions";

import PropTypes from "prop-types";
import { useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import debounce from "lodash.debounce";
import styles from "./SearchField.module.scss";

export function SearchFieldContainer() {
  const initialText = useSelector((state) => state.textToSearch);
  const dispatch = useDispatch();
  const handleInputCompleted = (text) => {
    dispatch(setTextToSearch(text));
  };
  return <SearchFieldComponent initialText={initialText} onInputCompleted={handleInputCompleted} />;
}

export function SearchFieldComponent({ initialText, onInputCompleted, delay = 500 }) {
  const input = useRef(null);
  const handleInput = () => {
    if (input && input.current) {
      const { value } = input.current;
      onInputCompleted(value.length > 3 ? value : "");
    }
  };
  return (
    <div className={styles.container}>
      <IconButton size="small">
        <SearchIcon color="secondary" />
      </IconButton>
      <InputBase
        placeholder="Search..."
        defaultValue={initialText}
        variant="outlined"
        size="small"
        fullWidth={true}
        inputRef={input}
        onChange={debounce(handleInput, delay)}
      />
    </div>
  );
}

SearchFieldComponent.propTypes = {
  initialText: PropTypes.string,
  onInputCompleted: PropTypes.func,
  delay: PropTypes.number,
};
