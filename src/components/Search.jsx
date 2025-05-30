import React from "react";

const Search = (props) => {
  return (
    <div className="search">
      <div>
        <img src="/movieapp/search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search Movies"
          value={props.searchTerm}
          onChange={(e) => props.setSearchTerm(e.target.value)}
        ></input>
      </div>
    </div>
  );
};

export default Search;
