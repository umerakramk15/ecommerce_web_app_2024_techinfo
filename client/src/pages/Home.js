import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

function Home() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
}

export default Home;
