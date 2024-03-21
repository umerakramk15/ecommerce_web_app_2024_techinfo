import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Layout from "../../components/Layout/Layout";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
        );
        
        console.log("data send to server")
      if (res.data.success) {
        toast.success(res.data.message);
        console.log("data send to server")

        navigation("/login");
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
            <label htmlFor="exampleInputAnswer" className="form-label">
              Answer Your Fav Dish Name ?
            </label>
            <input
              value={answer}
              type="text"
              className="form-control"
              id="exampleInputAnswer"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <input
              value={newPassword}
              type="password"
              className="form-control"
              id="exampleInputNewPassword1"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Recover your account
          </button>
        </div>
      </form>
    </Layout>
  );
}
export default ForgotPassword;
