import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Resgister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );

      if (res.data.success) {
        toast.success(res.data.message);
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
      <div className="overflow-hidden">
        <div className="row gx-4 d-flex flex-row align-items-center justify-content-center">
          <div className=" col-md-6 d-flex flex-column align-items-center justify-content-center">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
            <h1>Create an account</h1>
            <h6>Enter your details below</h6>

            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="mb-2">
                  <label htmlFor="exampleInputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    value={name}
                    style={{ width: "400px" }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    value={email}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    style={{ width: "400px" }}
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
                    style={{ width: "400px" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputPhone" className="form-label">
                    Phone
                  </label>
                  <input
                    value={phone}
                    type="text"
                    className="form-control"
                    // id="exampleInputPhone"
                    style={{ width: "400px" }}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    value={address}
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    style={{ width: "500px" }}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleInputAnswer" className="form-label">
                    Enter Your Favorite Food (Remeber it !)
                  </label>
                  <input
                    value={answer}
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{ width: "500px" }}
                  />
                </div>
                <button type="submit" className="btn btn-danger px-4">
                  Register
                </button>
                <button
yyy                  className="btn btn-outline-danger px-4 m-3"
                  onClick={() => {
                    navigation("/login");
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Resgister;
