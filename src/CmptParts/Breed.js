import { DropdownIcon } from "../Components/DropdownIcon";
import { useState, useEffect, useRef } from "react";
import breedList from "../breedList.json";

export function Breed({ onChange, className }) {
  const options = breedList.breedList;
  let optionSelected = onChange;

  return (
    <div className={className}>
      <label className="filter_cont_breed_label">
        Breed{" "}
        <span className="addHorse_cont_basics_details_name_gender_error">
          *
        </span>
      </label>
      <div className="filter_cont_breed">
        <BreedDropdown
          isSearchable
          placeholder="Breed"
          options={options}
          optionSelected={optionSelected}
        />
      </div>
    </div>
  );
}

function BreedDropdown({ placeholder, options, isSearchable, optionSelected }) {
  const [showOptions, setShowOptions] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);

  const inputRef = useRef();

  const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef();

  useEffect(() => {
    setSearchValue("");
    if (showOptions && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showOptions]);

  const onSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  useEffect(() => {
    const handler = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (event) => {
    // event.stopPropagation();
    setShowOptions(!showOptions);
  };

  const getBreedSelection = () => {
    if (selectedValue) {
      return selectedValue.label;
    }
    return placeholder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
    optionSelected(option.label);
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  return (
    <div
      className="filter_cont_breed_dropdown"
      ref={inputRef}
      onClick={handleInputClick}
    >
      <div className="filter_cont_breed_dropdown_selector">
        <div className="filter_cont_breed_selector_selection">
          {getBreedSelection()}
        </div>
      </div>
      {showOptions && (
        <div className="filter_cont_breed_dropdown_options">
          {isSearchable && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="filter_cont_breed_dropdown_search"
            >
              <input
                type="text"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
            </div>
          )}
          <div
            onClick={() => onItemClick({ label: "" })}
            className={`filter_cont_breed_dropdown_options_singleOption 
            }`}
          >
            Select
          </div>
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`filter_cont_breed_dropdown_options_singleOption ${
                isSelected(option) && "selected"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      <DropdownIcon />
    </div>
  );
}
