import React from "react";
import {
  Snackbar,
  Alert as MuiAlert,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

const Alert = ({
  open,
  handleCloseSnackbar,
  openPopup,
  setOpenPopup,
  variants,
  handleDeleteVariant,
}) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", fontSize: "14px", padding: "8px" }}
        >
          You Create Successfully !!!
        </MuiAlert>
      </Snackbar>

      <Dialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        maxWidth="md"
      >
        <DialogTitle>
          <div>Your Variants</div>
        </DialogTitle>
        <DialogContent dividers>
          {variants.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center">
              No variants to display.
            </Typography>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {variants.map((variant, index) => (
                <ProductCard
                  key={index}
                  title={`Variant ${index + 1}`}
                  description={`Size: ${variant.size}, Color: ${variant.color}, Stock: ${variant.stock}`}
                  imageUrl={URL.createObjectURL(variant.images)}
                  onDelete={() => handleDeleteVariant(index)}
                />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Alert;
