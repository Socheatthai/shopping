import React, { useState, useEffect } from "react";
import "./orderdetail.scss";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const productResponse = await axios.get(
        `http://localhost:3000/api/orders/Orderdetail/${orderId}`
      );
      setProduct(productResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (params) => {
    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`, {
        data: { ProductVariantId: params.id },
      });

      // After successful deletion, fetch all products again to update the list
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const modifyData = product.map((item) => {
    return {
      id: item.ProductVariant.id,
      title: item.ProductVariant.Product.title,
      image: item.ProductVariant.image,
      size: item.ProductVariant.size,
      price: item.ProductVariant.Product.price,
      quantity: item.quantity,
      category: item.ProductVariant.Product.category, // Include the "category" field
    };
  });

  const columns = [
    { field: "id", headerName: "VariantId", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              src={params.row.image}
              alt={params.row.title}
              className="cellImg"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "category", headerName: "category", width: 120 },
    { field: "size", headerName: "Size", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
  ];

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <div className="cellAction">
        {/* <NavLink
          to={`/productDetail/${params.id}`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "red" : "",
            color: isActive ? "white" : "black",
            cursor: "pointer",
            textDecoration: "none",
          })}
        >
          <div className="viewButton">Detail</div>
        </NavLink> */}
        <div className="deleteButton" onClick={() => handleDelete(params)}>
          Delete
        </div>
      </div>
    ),
  };

  return (
    <div className="OrderDetail">
      <Slider />
      <div className="OrderDetailContainer">
        <Navbar />
        <div className="container">
          <h1>Product Order</h1>
          <DataGrid
            rows={modifyData}
            columns={[...columns, actionColumn]}
            pagination
            pageSize={5}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
