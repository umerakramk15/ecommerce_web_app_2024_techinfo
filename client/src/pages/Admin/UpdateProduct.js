import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

function UpdateProduct() {
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const navigation = useNavigate();
  const params = useParams();

  //getSingleProduct
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      console.log(data.product);
      setId(data.product._id);
      setName(data.product.name);
      setPhoto(data.product.photo);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // getAll Category
  const getAllCategory = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some Went wrong in category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);

  // handle create product function
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);

      console.log(id);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigation("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("SometHING ERROR in Updating Product");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const asnwer = window.prompt(
        "are your Sure want to delete this Product ? "
      );
      if (!asnwer) {
        const { data } = axios.delete(
          `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
        );
        toast.success("product Deleted ");
        navigation("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Deleting Products");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            {" "}
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Products</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {" "}
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "uplaod photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3 w-75">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="write a Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Product Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <Select
                bordered={false}
                placeholder="Select a Value"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "yes" : "No"}
              >
                <Option value="0">Yes</Option>
                <Option value="1">No</Option>
              </Select>
            </div>
            <div className="mb-3 w-75">
              <button
                className="btn btn-primary m-3"
                onClick={handleUpdateProduct}
              >
                Update Product
              </button>
              <button className="btn btn-danger" onClick={handleDeleteProduct}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
