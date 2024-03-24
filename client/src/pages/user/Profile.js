import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [auth, setAuth] = useAuth();

  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(`Profile Successfully Updated`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;

    setName(name);
    setAddress(address);
    setEmail(email);
    setPhone(phone);
  }, [auth?.user]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            {" "}
            <UserMenu />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="container pt-5">
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                    disabled
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
                <div className="mb-3">
                  <label htmlFor="exampleInputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    value={address}
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPhone" className="form-label">
                    Phone
                  </label>
                  <input
                    value={phone}
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="exampleInputAnswer" className="form-label">
                    Enter Your Favorite Food name and remember it.
                    {`if your forgot you password it will help you to recover you account`}
                  </label>
                  <input
                    value={answer}
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div> */}
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
