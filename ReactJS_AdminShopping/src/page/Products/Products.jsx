import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./product.scss";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import { NavLink } from "react-router-dom";
import axios from "axios";
import HeaderPage from "../../components/HeaderPage/HeaderPage";
import StoreIcon from "@mui/icons-material/Store";

const Products = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const productResponse = await axios.get(
        "http://localhost:3000/api/products"
      );
      setProduct(productResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (params) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${params.id}`);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {/* <img
              src={params.row.image}
              alt={params.row.title}
              className="cellImg"
            /> */}
            {params.row.title}
          </div>
        );
      },
    },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "category",
      headerName: "Category",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStock ${params.row.category}`}>
            {params.row.category}
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <NavLink
            to={`/productDetail/${params.id}`}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "red" : "",
              color: isActive ? "white" : "black",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
            })}
          >
            <div className="viewButton">Detail</div>
          </NavLink>

          <div className="deleteButton" onClick={() => handleDelete(params)}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="product">
      <Slider />
      <div className="productContainer">
        <Navbar />
        <HeaderPage
          title="Product"
          subtitle="Our Product"
          icon={<StoreIcon />}
        />
        <div className="tableUser">
          <div className="CotainerBtn">
            <div className="title">Products</div>
            <NavLink
              to={"/newProduct"}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "red" : "",
                color: isActive ? "white" : "black",
                cursor: "pointer",
                textDecoration: "none", // Remove underline
              })}
            >
              <div className="AddProduct">AddProduct</div>
            </NavLink>
          </div>
          <DataGrid
            rows={product}
            columns={columns.concat(actionColumn)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
