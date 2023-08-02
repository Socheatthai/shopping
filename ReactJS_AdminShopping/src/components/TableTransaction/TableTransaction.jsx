import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import "./tabletransaction.scss";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchContext from "../../Context/SearchContext";

const List = ({ data, approve, home }) => {
  const [rowsOrder, setRowsOrder] = useState([]);
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [modifiedData, setModifiedData] = useState([]);
  const { filteredProducts, searchOrder } = useContext(SearchContext);

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/");
        setRowsOrder(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getAllOrder();
  }, []);

  useEffect(() => {
    let dataToMap = [];
    if (searchOrder) {
      dataToMap = filteredProducts;
    } else if (approve) {
      dataToMap = approve;
    } else if (rowsOrder) {
      dataToMap = rowsOrder;
    } else {
      dataToMap = data;
    }

    const modifiedData = dataToMap.map((item) => {
      const [ProductVariant] = item.ProductVariants || [];
      return {
        id: item.id,
        product: ProductVariant?.Product?.title,
        img: ProductVariant?.image,
        customer: item.email,
        username: item.User?.username,
        phone: item.phone,
        date: item.createdAt,
        amount:
          parseInt(ProductVariant?.Product?.price || 0) *
          parseInt(ProductVariant?.OrderProduct?.quantity || 0),
        method: item.payment,
        status: item.status,
      };
    });

    setModifiedData(modifiedData);
  }, [data, rowsOrder, filteredProducts, searchOrder, approve]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = modifiedData.slice(startIndex, endIndex);

  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      await axios.put(`http://localhost:3000/api/orders/${orderId}`, {
        status: newStatus,
      });

      // Update the order status in the local state or refetch the orders if needed
      const updatedRowsOrder = rowsOrder.map((row) => {
        if (row.id === orderId) {
          return { ...row, status: newStatus };
        }
        return row;
      });
      setRowsOrder(updatedRowsOrder);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Customer</TableCell>
              <TableCell className="tableCell">Username</TableCell>
              <TableCell className="tableCell">Phone</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              {(data || home || rowsOrder) && (
                <TableCell className="tableCell">Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>

                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.username}</TableCell>
                <TableCell className="tableCell">{row.phone}</TableCell>
                <TableCell className="tableCell">
                  {new Date(row.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.method}</TableCell>
                <TableCell className="tableCell">
                  {approve || data || home ? (
                    <span className={`status ${row.status}`}>{row.status}</span>
                  ) : (
                    <select
                      className="statusSelect"
                      value={row.status}
                      onChange={(event) => handleStatusChange(event, row.id)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                    </select>
                  )}
                </TableCell>
                {(data || rowsOrder) && (
                  <TableCell className="tableCell">
                    <Link to={`/orderDetail/${row.id}`}>
                      <button className="viewButton">View</button>
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {!data && !modifiedData.length && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {modifiedData.length > 0 && (
        <Pagination
          count={Math.ceil(modifiedData.length / ITEMS_PER_PAGE)}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          style={{ paddingTop: "10px" }}
        />
      )}
    </>
  );
};

export default List;
