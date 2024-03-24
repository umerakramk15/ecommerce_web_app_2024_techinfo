import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div style={{ overflow: "hidden" }}>
        <div className="row">
          <div
            className="container col-md-4 d-flex flex-wrape flex-column justify-content-center"
            style={{ margin: "0px 0px 0px 320px" }}
          >
            <p style={{ color: "gray" }}>Home / About</p>
            <h1 style={{ fontSize: "55px", fontWeight: "700" }} className="px-4">Our Story</h1>
            <p className="text-justify mt-2 px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              officiis obcaecati esse tempore unde ratione, eveniet mollitia,
              perferendis eius temporibus dicta blanditiis doloremque explicabo
              quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
              asj doloremque explicabo quasi sunt vero optio cum aperiam vel
              consectetur! Laborum enim asj Hello World <br />
              <br/>
              accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
              commodi illum quidem neque temp commodi illum quidem neque temora
              nam. commodi illum quidem neque tem
            </p>
          </div>
          <div className="col-md-6 ">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/894fcb125715005.611e8a8574c99.png"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
