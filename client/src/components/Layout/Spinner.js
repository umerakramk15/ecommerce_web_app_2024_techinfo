import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

function Spinner({ path = "login" }) {
  const [count, setCount] = useState(6);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,path
      });

    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div
      class="d-flex justify-content-center flex-column align-items-center"
      style={{ height: "70vh" }}
    >
      <h1 className="text-center">redirecting to you in {count}s</h1>
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  );
}

export default Spinner;
