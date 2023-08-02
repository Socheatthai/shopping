import React, { useEffect, useState } from "react";
import "./tableuser.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { columns, rows } from "../../../data";
import axios from "axios";
import { NavLink } from "react-router-dom";
const TableUser = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getAllUser = async () => {
      const res = await axios.get("http://localhost:3000/api/users/");
      setUser(res.data);
    };
    getAllUser(user);
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              src={params.row.avatar}
              alt={params.row.avatar}
              className="cellImg"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "createdAt",
      headerName: "Register",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStock ${params.row.createdAt}`}>
            {new Date(params.row.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
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
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <NavLink to={`/users/${params.row.id}`}>
              <div className="viewButton">View</div>
            </NavLink>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="tableUser">
      <DataGrid
        rows={user}
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
  );
};

export default TableUser;
