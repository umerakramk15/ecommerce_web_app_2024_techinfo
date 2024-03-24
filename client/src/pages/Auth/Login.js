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
      <div className="overflow-hidden">
        <div className="row d-flex flex-row align-items-center justify-content-center">
          <div className=" col-md-6 d-flex flex-column align-items-center justify-content-center">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center">
            <h1>Log in to Exclusive</h1>
            <h6>Enter your details below</h6>
            <form onSubmit={handleSubmit}>
              <div className="container pt-5">
                <div className="mb-2">
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
                <div className="mb-2">
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

                <button type="submit" className="btn btn-danger px-4">
                  Login
                </button>
                <button
                  className="btn text-danger p-4"
                  onClick={() => {
                    navigation("/forgot-password");
                  }}
                >
                  forgot password? Click here!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
