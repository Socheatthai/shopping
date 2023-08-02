import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const Preview = ({ productItem }) => {
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    productItem.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2); // Format the total price to have two decimal places
  };

  if (!productItem || productItem.length === 0) {
    return (
      <Typography variant="subtitle1" sx={{ padding: "20px" }}>
        No items in the order.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="subtitle1">Order Summary</Typography>
      <Box
        sx={{
          height: productItem.length > 2 ? "200px" : "auto",
          overflow: productItem.length > 2 ? "auto" : "visible",
        }}
      >
        <List>
          {productItem.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "10px",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                sx={{ padding: "10px" }}
                secondary={
                  <>
                    <Typography
                      sx={{
                        display: "inline",
                        fontSize: "14px",
                        color: "primary.main",
                      }}
                      component="span"
                      variant="body2"
                    >
                      Quantity: {item.quantity}
                    </Typography>{" "}
                    <br />
                    <Typography
                      sx={{
                        display: "inline",
                        fontSize: "14px",
                        color: "text.secondary",
                      }}
                      component="span"
                      variant="body2"
                    >
                      Size: {item.size}
                    </Typography>{" "}
                    <br />
                    <Typography
                      sx={{
                        display: "inline",
                        fontSize: "14px",
                        color: "text.secondary",
                      }}
                      component="span"
                      variant="body2"
                    >
                      Color: {item.color}
                    </Typography>{" "}
                  </>
                }
              />
              <Typography>${item.price}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <ListItem>
        <ListItemText
          primary="Total Payment"
          sx={{ padding: "10px" }}
          secondary={
            <Typography
              style={{
                fontWeight: "700",
                margin: "10px 0",
              }}
            >
              ${calculateTotalPrice()}
            </Typography>
          }
        />
      </ListItem>
    </>
  );
};

export default Preview;
