import { useSelector, useDispatch } from "react-redux";
import { setTextToSearch } from "../../redux/actions";

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

interface Props {
  initialText: string;
  delay?: number;
  onInputCompleted: (value: string) => void;
}

export function SearchFieldComponent({ initialText, onInputCompleted, delay = 500 }: Props) {
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
        fullWidth={true}
        inputRef={input}
        onChange={debounce(handleInput, delay)}
      />
    </div>
  );
}
