import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";


export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case photo && photo.size > 100000:
        return res.status(500).send({ error: "photo is Required" });
    }

    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(200).send({
      success: true,
      message: "Product Created SuccessFully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Create Product",
    });
  }
};

// get all product controller

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Data Successfully Printed",
      products,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        message: "Error While Access all Products",
      });
  }
};

// get single product

export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Data Successfully Printed",
      product,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        message: "Error While Access single Products",
      });
  }
};

export const getSingleProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        message: "Error While Access single Product Photo",
      });
  }
};

export const deleteSingleProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");

    res.status(200).send({
      success: true,
      message: "Product Deleetd Successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        message: "Error While Deleteing single Product",
      });
  }
};

// update  Product  Controller

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case photo && photo.size > 100000:
        return res.status(500).send({ error: "photo is Required" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(200).send({
      success: true,
      message: "Product updated Created SuccessFully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update Product",
    });
  }
};
