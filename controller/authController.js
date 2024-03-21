import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// POST REGISTER
export const resgisterController = async (req, res) => {
  try {
    // access data from client side using req.body

    const { name, email, password, phone, address, answer } = req.body;

    // validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Asnwer is Required" });
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
      answer,
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

//POST | LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // check user
    const axisitingUSer = await userModel.findOne({ email });
    // exisiting user
    if (!axisitingUSer) {
      return res.status(404).send({
        success: false,
        message: "Please Register First",
      });
    }
    const matchPassword = await comparePassword(
      password,
      axisitingUSer.password
    );

    if (!matchPassword) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign(
      { _id: axisitingUSer._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: axisitingUSer.name,
        email: axisitingUSer.email,
        address: axisitingUSer.address,
        phone: axisitingUSer.phone,
        role: axisitingUSer.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// forgot password

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({
        success: false,
        message: "Email missing",
      });
    }
    if (!answer) {
      res.status(400).send({
        success: false,
        message: "Answer missing",
      });
    }

    if (!newPassword) {
      res.status(400).send({
        success: false,
        message: "New Password missing",
      });
    }

    // check
    const user = await userModel.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went wrong",
      error,
    });
  }
};
