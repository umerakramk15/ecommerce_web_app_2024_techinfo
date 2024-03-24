import React, { useState } from "react";
import { useSearch } from "../../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex"
        role="search"
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #CDD5DC",
          backgroundColor: "white",
          fontSize: "20px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="what are you looking for..."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{border : "0px solid black",width : "300px"}}
        />
        <button className="btn" type="submit">
          <FaSearch style={{ color: "Gray", fontSize: "20px" }} />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
