import React from 'react';
import { useRef } from "react";
import Select from "react-select";

export function ComboboxAutocomplete({ options, getSelected }) {
  const select = useRef(null);

  const handleChange = (selectedOption) => {
    getSelected(selectedOption);

    // setSelected({ selectedOption }, () =>
    //   console.log(`Option selected:`, selected)
    // );
  };

  const onInputChange = (e, m) => {
    if (e.length === 0) select.current.blur();
  };

  return (
    <Select
      id="idMultiSelect"
      ref={select}
      onChange={handleChange}
      openMenuOnClick={false}
      isLoading={true}
      isSearchable={true}
      onInputChange={onInputChange}
      isClearable={true}
      options={options}
      noOptionsMessage="noOptionsMessage"
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Search..."
      theme={(theme) => ({
        ...theme,
        borderRadius: "3px",
        colors: {
          ...theme.colors,
          primary25: "#FED580",
          primary: "#ed8d00",
        },
      })}
    />
  );
}
