import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { Typography, Button } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import styled from "styled-components";
import { publicRequest } from "../../requestMethod";
const StatusSpan = styled.span`
  font-weight: bold;
  ${({ status }) =>
    status === "Approved"
      ? "color: green;"
      : status === "Pending"
      ? "color: orange;"
      : ""};
`;
const ITEMS_PER_PAGE = 4;

const Orders = () => {
  const [rowsOrder, setRowsOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const TOKEN = Cookies.get("userInfo");
  const userid = TOKEN ? jwtDecode(TOKEN).id : null;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await publicRequest.get(`/orders/find/${userid}`);
        setRowsOrder(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = rowsOrder.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleCancel = async (orderId, variantId) => {
    try {
      await publicRequest.delete(`/orders/${orderId}`, {
        data: { ProductVariantId: variantId },
      });
      setRowsOrder((prevRowsOrder) =>
        prevRowsOrder.filter((row) => row.id !== orderId)
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <a href="/">
            <Button variant="contained">Go Home</Button>
          </a>
          <a href="/cart">
            <Button variant="contained">Go Cart</Button>
          </a>
        </div>
        <Typography
          variant="h5"
          align="center"
          color="secondary"
          sx={{ marginBottom: "20px" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LocalShippingIcon
              style={{ marginRight: "10px", fontSize: "2rem" }}
            />
            YOUR ORDER
          </div>
        </Typography>
        {rowsOrder.length > 0 ? (
          <div style={{ padding: "20px", width: "90%", margin: "0 auto" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#fc466b" }}>
                    <TableCell className="tableHeaderCell" width="25%">
                      Product
                    </TableCell>
                    <TableCell className="tableHeaderCell" width="20%">
                      Customer
                    </TableCell>
                    <TableCell className="tableHeaderCell" width="15%">
                      Date
                    </TableCell>
                    <TableCell className="tableHeaderCell" width="15%">
                      Amount
                    </TableCell>
                    <TableCell className="tableHeaderCell" width="15%">
                      Status
                    </TableCell>
                    <TableCell className="tableHeaderCell" width="10%">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: "#f6f6f6" }}>
                  {currentData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="tableCell" width="25%">
                        <div
                          className="cellWrapper"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <img
                            src={row.img}
                            alt=""
                            className="image"
                            style={{
                              height: "32px",
                              width: "32px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          />
                          {row.product}
                        </div>
                      </TableCell>
                      <TableCell className="tableCell" width="20%">
                        {row.customer}
                      </TableCell>
                      <TableCell className="tableCell" width="15%">
                        {new Date(row.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="tableCell" width="15%">
                        ${row.amount}
                      </TableCell>
                      <TableCell className="tableCell" width="15%">
                        <StatusSpan status={row.status}>
                          {row.status}
                        </StatusSpan>
                      </TableCell>
                      <TableCell className="tableCell" width="10%">
                        {row.status === "Pending" ? (
                          <Button
                            onClick={() => handleCancel(row.id, row.varianId)}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button disabled>Cancel</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination
              count={Math.ceil(rowsOrder.length / ITEMS_PER_PAGE)}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
              style={{ paddingTop: "10px" }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            You Not Yet Have Any Order !!!
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
