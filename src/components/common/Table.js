import React from 'react';
import { useState } from "react";
import { FormControl, InputGroup, Spinner } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { DATATABLE_NO_DATA } from "../common/Costanst";

export function Table(props) {
  const {
    data,
    title,
    columns,
    selectableRows,
    loading,
    canSearch,
    searchCriteria,
    paginationComponentOptions,
    defaultSortField,
  } = props;

  const [search, setSearch] = useState("");

  createTheme("custom", {
    title: {
      backgroundColor: "#e99401",
      height: "5px",
      fontColor: "#e99401",
    },
    header: {
      fontSize: "16px",
      backgroundColor: "#e99401",
      fontColor: "#e99401",
      fontWeight: "bold",
      
    },
    rows: {
      backgroundColor: "#FFFFFF",
      borderWidth: "5px",
    },
  });

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const cancelSearch = (e) => {
    if (e.keyCode === 27) {
      setSearch("");
    }
  }

  let result = [];
  if (!search || !canSearch) {
    result = data;
  } else {
    result = data.filter(function (item) {
      for (const key of searchCriteria) {
        if (item[key] !== undefined && item[key].toLowerCase().includes(search))
          return true;
      }
      return false;
    });
  }

  return (
    <DataTable
      title={title}
      columns={columns}
      data={result}
      theme="custom"
      striped={true}
      selectableRows={selectableRows}
      noDataComponent={DATATABLE_NO_DATA}
      progressPending={loading}
      progressComponent={
        <Spinner animation="border" variant="warning" className="mt-3" />
      }
      pagination={10}
      paginationPerPage={10}
      paginationComponentOptions={paginationComponentOptions}
      defaultSortField={defaultSortField}
      noHeader={true}
      fixedHeader
      fixedHeaderScrollHeight="300px"
      highlightOnHover
      pointerOnHover
      subHeader={canSearch}
      subHeaderComponent={
        canSearch && (
          <div className="col-md-4">
            <InputGroup>
              <FormControl
                placeholder="Search..."
                aria-label="Search"
                value={search}
                onChange={handleSearch}
                className="ml-2"
                onKeyDown={cancelSearch}
              />
              <InputGroup.Text>
                <i className="material-icons">search</i>
              </InputGroup.Text>
            </InputGroup>
          </div>
        )
      }
      persistTableHead
    />
  );
}
