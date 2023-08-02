import React, { useState, useEffect } from "react";
import "./productdetail.scss";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert as MuiAlert,
} from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import HeaderPage from "../../components/HeaderPage/HeaderPage";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  editButton: {
    position: "absolute",
    right: "-0.5px",
    top: "0",
    padding: "10px",
    borderRadius: "5px 0 5px 0",
    background: "#D4FD06",
    cursor: "pointer",
  },
});

const sizes = ["S", "M", "L", "XL", "XXL"];
const categories = ["TEES", "TANKS", "DRESSES"];
const colors = [
  { label: "Red", value: "#ff0000" },
  { label: "Green", value: "#00ff00" },
  { label: "Blue", value: "#0000ff" },
  { label: "Yellow", value: "#ffff00" },
  { label: "Purple", value: "#800080" },
];

const ProductDetail = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    color: "",
    size: "",
    stock: "",
    image: "",
    title: "",
    desc: "",
    price: "",
    category: "",
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [image, setImage] = useState("");
  const [variant, setVariant] = useState(null);
  const { productId } = useParams();
  const getVariant = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/products/find/${productId}`
      );
      setVariant(res.data);
    } catch (error) {
      console.error("Error fetching variant:", error);
    }
  };
  useEffect(() => {
    getVariant();
  }, [productId]);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleChange = (type, value) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setEditingItemId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpen(false);

    // Find the specific product variant to update
    const productToUpdateIndex = variant.ProductVariants.findIndex(
      (item) => item.id === editingItemId
    );

    if (productToUpdateIndex === -1) {
      // Variant not found, return early or display an error message
      return;
    }

    // Create a copy of the product variant to update
    const updatedProduct = { ...variant.ProductVariants[productToUpdateIndex] };
    if (selectedValue.title) {
      variant.title = selectedValue.title;
      updatedProduct.title = selectedValue.title;
    }
    if (selectedValue.category) {
      variant.category = selectedValue.category;
      updatedProduct.category = selectedValue.category;
    }
    if (selectedValue.price) {
      variant.price = selectedValue.price;
      updatedProduct.price = selectedValue.price;
    }
    if (selectedValue.desc) {
      variant.desc = selectedValue.desc;
      updatedProduct.desc = selectedValue.desc;
    }
    if (selectedValue.color) {
      updatedProduct.color = selectedValue.color;
    }
    if (selectedValue.size) {
      updatedProduct.size = selectedValue.size;
    }
    if (selectedValue.stock) {
      updatedProduct.quantity = selectedValue.stock;
    }
    if (image) {
      updatedProduct.image = image;
    }

    // Create a new array with the updated product variant
    const updatedVariants = [...variant.ProductVariants];
    updatedVariants[productToUpdateIndex] = updatedProduct;
    // Update the state with the new array of variants
    setVariant((prevState) => ({
      ...prevState,
      ProductVariants: updatedVariants,
    }));
    //Convert URL to file image
    const getImageFile = async (imageUrl) => {
      try {
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });

        // Create a File object with a fixed filename "image.jpg" and the appropriate content type
        const file = new File([response.data], "image.jpg", {
          type: response.headers["content-type"],
        });

        return file; // Return the File object
      } catch (error) {
        console.error("Error fetching the data:", error);
        return null;
      }
    };

    const blob = await getImageFile(updatedProduct.image);
    const formData = new FormData();
    formData.append("ProductVariants", JSON.stringify(updatedProduct));
    formData.append("image", blob);
    const res = await axios.put(
      `http://localhost:3000/api/products/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending files
        },
      }
    );

    if (res.data.status === 200) {
      getVariant();
      setOpenAlert(true);
    }
    // Reset the selectedValue after updating
    setSelectedValue({
      color: "",
      size: "",
      stock: "",
      image: "",
      title: "",
      desc: "",
      price: "",
      category: "",
    });
    // Reset the image state after updating
    setImage("");
  };
  return (
    <div className="ProductDetail">
      <Slider />
      <div className="productDetailContainer">
        <Navbar />
        <HeaderPage
          title={variant?.title}
          subtitle={variant?.desc}
          icon={<DetailsIcon />}
        />

        <div style={{ height: "calc(100vh - 200px)", overflow: "auto" }}>
          <Paper
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              padding: "20px",
            }}
          >
            {variant &&
              variant.ProductVariants.map((item) => (
                <Card
                  key={item.id}
                  sx={{ maxWidth: 345 }}
                  style={{ position: "relative", margin: "10px 0" }}
                >
                  <div
                    className={classes.editButton}
                    onClick={() => handleClickOpen(item.id)}
                  >
                    Update
                  </div>

                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="140"
                    image={
                      selectedValue.image ? selectedValue.image : item.image
                    }
                  />
                  <CardContent style={{ position: "relative" }}>
                    <Typography variant="h6" component="div">
                      {variant.title}
                    </Typography>
                    <div
                      style={{
                        backgroundColor: "red",
                        padding: "10px",
                        borderRadius: "20px 0 20px 0",
                        position: "absolute",
                        top: "2px",
                        right: "6px",
                      }}
                    >
                      {variant.category}
                    </div>
                    <Typography variant="subtitle2" component="div">
                      {variant.desc}
                    </Typography>
                    <br />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div>
                        <Typography
                          style={{
                            margin: "0 10px",
                            maxWidth: "50px",
                            display: "inline-block",
                            border: "1px solid blue",
                            backgroundColor: "#9006FD",
                            textAlign: "center",
                          }}
                        >
                          Price: {variant.price}
                        </Typography>
                        <Typography
                          style={{
                            margin: "0 10px",
                            maxWidth: "50px",
                            display: "inline-block",
                            border: "1px solid blue",
                            backgroundColor: "#9006FD",
                            textAlign: "center",
                          }}
                        >
                          Color: {item.color}
                        </Typography>
                        <Typography
                          style={{
                            margin: "0 10px",
                            maxWidth: "50px",
                            display: "inline-block",
                            border: "1px solid blue",
                            backgroundColor: "#9006FD",
                            textAlign: "center",
                          }}
                        >
                          Size: {item.size}
                        </Typography>
                        <Typography
                          style={{
                            margin: "0 10px",
                            maxWidth: "50px",
                            display: "inline-block",
                            border: "1px solid blue",
                            backgroundColor: "#9006FD",
                            textAlign: "center",
                          }}
                        >
                          Stock: {item.quantity}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </Paper>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="color-dialog-title"
        maxWidth="sm"
      >
        <DialogTitle id="color-dialog-title">Update Variant</DialogTitle>
        <DialogContent>
          {" "}
          <FormControl fullWidth style={{ margin: "10px" }}>
            <TextField
              fullWidth
              value={selectedValue.title || variant?.title}
              onChange={(e) => handleChange("title", e.target.value)}
              inputProps={{ id: "title-input" }}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "10px" }}>
            <Select
              value={selectedValue.category || variant?.category}
              onChange={(e) => handleChange("category", e.target.value)}
              inputProps={{ id: "category-select" }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ margin: "10px" }}>
            <TextField
              fullWidth
              type="number"
              value={selectedValue.price || variant?.price}
              onChange={(e) => handleChange("price", e.target.value)}
              inputProps={{ id: "price-input" }}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "10px" }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={selectedValue.desc || variant?.desc}
              onChange={(e) => handleChange("desc", e.target.value)}
              inputProps={{ id: "desc-input" }}
            />
          </FormControl>
          <FormControl fullWidth style={{ margin: "10px" }}>
            <InputLabel htmlFor="color-select">Color</InputLabel>
            <Select
              value={selectedValue.color}
              onChange={(e) => handleChange("color", e.target.value)}
              inputProps={{ id: "color-select" }}
            >
              {colors.map((color) => (
                <MenuItem key={color.value} value={color.label}>
                  {color.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ margin: "10px" }}>
            <InputLabel htmlFor="size-select">Size</InputLabel>
            <Select
              value={selectedValue.size}
              onChange={(e) => handleChange("size", e.target.value)}
              inputProps={{ id: "size-select" }}
            >
              {sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ margin: "10px" }}>
            <TextField
              fullWidth
              type="number"
              value={selectedValue.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              inputProps={{ id: "stock-input" }}
            />
            <Button
              variant="contained"
              component="label"
              style={{ padding: "10px", marginTop: "10px" }}
            >
              Upload Image
              <input
                type="file"
                name="images"
                hidden
                onChange={(e) => handleImageChange(e)}
              />
            </Button>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
