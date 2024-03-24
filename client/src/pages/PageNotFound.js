import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404 Not Found</h1>
        <p className="pnf-heading">
          Your visited page not found. You may go home page.
        </p>
        <Link
          to="/"
          className="btn btn-outline-danger px-5 mt-5"
          style={{
            backgroundColor: "#f44336",
            color: "white",
            ":hover": { backgroundColor: "red" },
          }}
        >
          Back to home
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
