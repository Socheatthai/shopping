import React, { useState } from "react";
import "./newproduct.scss";
import Slider from "../../components/Slider/Slider";
import Navbar from "../../components/Navbar/Navbar";
import {
  Paper,
  TextField,
  Grid,
  MenuItem,
  Button,
  Typography,
  Badge,
  Snackbar,
} from "@mui/material";
import { category } from "../../constant/category";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ProductCard from "../../components/ProductCard/ProductCard";
import HeaderPage from "../../components/HeaderPage/HeaderPage";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import Alert from "../../components/Alert/Alert";

const colorOptions = [
  { label: "Red", value: "#ff0000" },
  { label: "Green", value: "#00ff00" },
  { label: "Blue", value: "#0000ff" },
  { label: "Yellow", value: "#ffff00" },
  { label: "Purple", value: "#800080" },
  // Add more color options as needed
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root, & .MuiButton-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
    padding: "20px",
  },
}));

const NewProduct = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const initialProductState = {
    title: "",
    desc: "",
    price: "",
    category: "",
  };

  const initialVariantState = {
    size: "",
    color: "",
    stock: "",
    images: null,
  };
  const [product, setProduct] = useState(initialProductState);
  const [variant, setVariant] = useState(initialVariantState);

  const resetForm = () => {
    setProduct(initialProductState);
    setVariants([]);
    setVariant(initialVariantState);
    setImages([]);
  };

  const isProductComplete = () => {
    return product.title && product.desc && product.price && product.category;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (variant.hasOwnProperty(name)) {
      setVariant({ ...variant, [name]: value });
    }
    if (product.hasOwnProperty(name)) {
      setProduct({ ...product, [name]: value });
    }
  };

  const handeAddVariant = () => {
    setVariants((prevVariants) => [...prevVariants, variant]);
  };

  const handleImageChange = (event) => {
    const selectedImages = event.target.files[0];
    setVariant((prevVariant) => ({
      ...prevVariant,
      images: selectedImages,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleSaveToSystem = async () => {
    try {
      const formData = new FormData();
      formData.append("product", JSON.stringify(product));
      formData.append("variants", JSON.stringify(variants));
      variants.forEach((imageFile, imageIndex) => {
        formData.append(`images`, imageFile.images);
      });

      const response = await axios.post(
        "http://localhost:3000/api/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setOpen(true);
      }
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVariant = (variantIndex) => {
    setVariants((prevVariants) =>
      prevVariants.filter((_, index) => index !== variantIndex)
    );
  };

  return (
    <div className="NewProduct">
      <Slider />
      <div className="NewProductContainer">
        <Navbar />
        <HeaderPage
          title="New Product"
          icon={<StoreOutlinedIcon />}
          subtitle="Create a new product"
        />

        <div className="Container">
          <Paper
            variant="elevation"
            elevation={2}
            className={`${classes.root} newProductPaper`}
          >
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic1"
                  label="Title"
                  variant="outlined"
                  required
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  autoFocus
                />

                <TextField
                  id="outlined-basic3"
                  label="Price"
                  variant="outlined"
                  type="number"
                  name="price"
                  required
                  value={product.price}
                  onChange={handleChange}
                />
                <TextField
                  select
                  label="Category"
                  required
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                >
                  {category.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-basic3"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                  name="desc"
                  value={product.desc}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  component="label"
                  style={{ padding: "10px" }}
                  onClick={handleSaveToSystem}
                  disabled={variants.length > 0 ? false : true}
                >
                  Save To System
                </Button>
              </Grid>

              <Grid item xs={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "80%",
                  }}
                >
                  <Badge badgeContent={variants.length} color="secondary">
                    <ShoppingBagIcon
                      onClick={() => setOpenPopup(true)}
                      sx={{ fontSize: 40, cursor: "pointer" }}
                      color="primary"
                    />
                  </Badge>
                </div>
                <TextField
                  select
                  label="Size"
                  name="size"
                  value={variant.size}
                  onChange={handleChange}
                >
                  {["S", "M", "X", "XL", "XXL"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Color"
                  name="color"
                  value={variant.color}
                  onChange={handleChange}
                >
                  {colorOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.label}
                      style={{ backgroundColor: option.label }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Stock"
                  variant="outlined"
                  required
                  type="number"
                  name="stock"
                  value={variant.stock}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  component="label"
                  style={{ padding: "10px" }}
                >
                  Upload Image
                  <input
                    type="file"
                    name="images"
                    // multiple
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "80%",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      padding: "10px",
                    }}
                    onClick={handeAddVariant}
                    disabled={!isProductComplete()}
                  >
                    Add Variants
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
      <Alert
        open={open}
        handleCloseSnackbar={handleCloseSnackbar}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        variants={variants}
        handleDeleteVariant={handleDeleteVariant}
      />
    </div>
  );
};

export default NewProduct;
