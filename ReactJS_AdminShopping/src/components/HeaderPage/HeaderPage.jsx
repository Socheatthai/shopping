import React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Typography, Button, Card } from "@mui/material";
import "./headerpage.scss";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root, & .MuiButton-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    padding: "20px",
  },
  pageHeader: {
    display: "flex",
    // alignItems: "center",
    padding: theme.spacing(4),
    // justifyContent: "space-between",
  },
  pageIcon: {
    display: "inline-flex",
    padding: theme.spacing(2),
    color: "#3c44b1",
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

const HeaderPage = ({ title, icon, subtitle }) => {
  const classes = useStyles();
  //   const handleGoBack = () => {
  //     window.location.href = window.location.origin + "/products";
  //   };
  return (
    <Paper elevation={0} className="headerPage">
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon} style={{ color: "#3c44b1" }}>
          {icon}
        </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div" color="primary">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div" color="primary">
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default HeaderPage;
