import "../styles/Search.scss";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import { api } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { BibleBooks, isNullOrEmpty } from "../utils";
import { supabase } from "../supabaseClient";

const Search: React.FC = () => {
  const { version, reference } = useParams();
  const [inputValue, setInputValue] = useState(reference);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(version);
  const [verseText, setVerseText] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const regexPattern = /.*[a-zA-Z]/;
    const bookMatch = reference?.match(regexPattern);
    const searchBook = bookMatch
      ? bookMatch[0].replace(/\s/g, "").toLowerCase()
      : null;
    let modifiedRef = "";

    if (searchBook != null && reference != null) {
      for (const [book, variations] of Object.entries(BibleBooks)) {
        if (variations.includes(searchBook)) {
          modifiedRef = reference.replace(regexPattern, book);
          setSearchValue(modifiedRef);
        }
      }
    }

    const fetchData = async () => {
      let data;
      try {
        if (version === "esv") {
          data = await api.fetchESV(searchValue, {
            signal: abortController.signal,
          });
        } else if (version === "nlt") {
          data = await api.fetchNLT(searchValue, {
            signal: abortController.signal,
          });
        }

        if (data !== undefined) {
          setVerseText(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [searchValue, setSearchValue]);

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

  const handleConfirm = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error: fetchError } = await supabase.from("verses").insert({
        reference: inputValue,
        version: selectedOption,
        verse_text: verseText,
        user_id: user?.id,
      });

      if (fetchError) {
        console.log("Error inserting verse: ", fetchError.message);
      } else {
        window.location.href = "/dashboard";
      }
    },
    [verseText, reference, version]
  );

  const clearValues = useCallback(() => {
    window.location.href = "/search/";
  }, []);

  return (
    <div className={"Search"}>
      <div className={"Search__row"}>
        <form className="Search__row__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="Search__row__form-text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <select
            className="Search__row__form-version"
            id="versions"
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            <option value="version">Version</option>
            <option value="esv">ESV</option>
            <option value="kjv">KJV</option>
            <option value="nlt">NLT</option>
            <option value="ylt">YLT</option>
          </select>
        </form>
        <div className="Search__row__footer">
          <i>Ex: Matthew 28:19 or Gen 1:1</i>
        </div>
      </div>
      {!isNullOrEmpty(verseText) ? (
        <form className="Search__verseCard" onSubmit={handleConfirm}>
          <div className="Search__verseCard__text">{verseText}</div>
          <div className="Search__verseCard__reference">
            {`${searchValue} (${version?.toUpperCase()})`}
          </div>
          <button
            className="Search__verseCard__add btn btn-success me-3"
            type="submit"
          >
            <FontAwesomeIcon icon={faCheck} className="me-2" />
            Add Verse
          </button>
          <button
            className="Search__verseCard__reset btn btn-danger"
            onClick={clearValues}
          >
            <FontAwesomeIcon icon={faTrash} className="me-2" />
            Reset
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default Search;
