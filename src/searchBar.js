import React from "react";

/**
 * @param props.handleChange: the function to filter based on text change
 */
export default function SearchBar(props) {
  return (
    <div className="row">
      <div className="col-1"></div>
      <div className="col">
        <form className="d-flex">
          <label className="search-label" htmlFor="searchBar">
            Search
          </label>
          <input
            className="form-control me-2"
            id="searchBar"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={props.handleChange}
          />
        </form>
      </div>
      <div className="col-1"></div>
    </div>
  );
}
