import React from "react";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../redux/slises/filterSlise";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        name="search"
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Search pizza..."
      />
      {
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="-0.5 0 25 25"
          fill="none"
        >
          <path
            d="M3 21.32L21 3.32001"
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 3.32001L21 21.32"
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
