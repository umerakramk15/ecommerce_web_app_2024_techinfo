import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";

export const resgisterController = async (req, res) => {
  try {
    // access data from client side using req.body

    const { name, email, password, phone, address } = req.body;

    // validation
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    // check user
    const axisitingUSer = await userModel.findOne({ email });
    // exisiting user
    if (axisitingUSer) {
      return res.status(200).send({
        success: true,
        message: "Already Register Please Login",
      });
    }

    // hashing user password before resgister or save user
    const hashedPassword = await hashPassword(password);

    // save user

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
