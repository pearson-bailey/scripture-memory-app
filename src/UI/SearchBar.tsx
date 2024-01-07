import "../styles/SearchBar.scss";
import React, { FormEvent, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  showSearchBar: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ showSearchBar }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
    },
    [inputValue]
  );

  const handleSelectChange = useCallback(
    (value: string) => {
      setSelectedOption(value);
    },
    [selectedOption]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      window.location.href = `/search/${selectedOption}/${inputValue}`;
    },
    [inputValue, selectedOption]
  );

  return (
    <div className={"SearchBar"}>
      <div className={"SearchBar__row"}>
        <form
          className="SearchBar__row__form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            className="SearchBar__row__form-text"
            placeholder="Search text here"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            required
          />
          <a className="SearchBar__row__form-close" onClick={showSearchBar}>
            <FontAwesomeIcon icon={faXmark} size="2xl"></FontAwesomeIcon>
          </a>
          <select
            className="SearchBar__row__form-version"
            id="versions"
            onChange={(e) => handleSelectChange(e.target.value)}
            required
          >
            <option value="version" selected>
              Version
            </option>
            <option value="esv">ESV</option>
            <option value="kjv">KJV</option>
            <option value="nlt">NLT</option>
            <option value="ylt">YLT</option>
          </select>
        </form>
        <div className="SearchBar__row__footer">
          <i>Ex: Matthew 28:19 or Gen 1:1</i>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
