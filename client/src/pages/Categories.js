import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mb-3 gx-3 gy-3">
            {categories.map((c) => (
              <Link to={`/category/${c.slug}`} className="btn btn-primary m-2">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
