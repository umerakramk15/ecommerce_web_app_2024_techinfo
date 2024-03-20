import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigation(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="container pt-5">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email Address
            </label>
            <input
              value={email}
              type="email"
              className="form-control"
              id="exampleInputEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Login;
