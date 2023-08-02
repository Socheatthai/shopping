import React, { useState } from "react";
import {
  Paper,
  TextField,
  Grid,
  Step,
  Typography,
  Box,
  Stepper,
  StepLabel,
  Button,
  Container,
  Divider,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";

import Preview from "../components/Preview";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { TokenRequest } from "../../requestMethod";

const steps = ["Shopping Address", "Payment Detail"];

const PaymentForm = ({ productOrder }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    userId: productOrder[0].userId,
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [activeStep, setActiveStep] = useState(0);
  const elements = useElements();
  const stripe = useStripe();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [isPaymentSuccess, setPaymentSuccess] = useState(false);
  const [product, setProduct] = useState(productOrder);
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px", // Add padding to the CardElement
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handlePaymentMethod = (event) => setPaymentMethod(event.target.value);

  const handleUserInfoChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleCardPayment = async () => {
    setPaymentLoading(true);
    const cardElement = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error.message);
      setPaymentLoading(false);
    } else {
      try {
        const response = await TokenRequest.post("/stripe/payments", {
          paymentMethodId: paymentMethod.id,
          userInfo,
          product,
        });

        if (response.data && response.data.clientSecret) {
          const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(response.data.clientSecret, {
              payment_method: paymentMethod.id,
            });

          if (confirmError) {
            console.error("Error confirming payment:", confirmError.message);
          } else {
            console.log("Payment confirmed:", paymentIntent);
            setPaymentSuccess(true);
            setProduct([]);
          }
        }
      } catch (error) {
        console.error("Error processing card payment:", error.message);
      } finally {
        setPaymentLoading(false);
      }
    }
  };

  const handleCashPayment = async () => {
    try {
      setPaymentLoading(true);
      const response = await TokenRequest.post("/orders", {
        userInfo,
        product,
      });

      // Simulate a 2-second delay before setting payment success state
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPaymentSuccess(true);
      setProduct([]);
    } catch (error) {
      console.error("Error processing cash payment:", error.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === "card" && stripe && elements) {
      await handleCardPayment();
    } else if (paymentMethod === "cash") {
      await handleCashPayment();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentMethod === "card" && stripe && elements) {
      handlePayment();
    } else if (paymentMethod === "cash") {
      handleNext();
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper sx={{ width: "80%", padding: "10px" }}>
          <Stepper activeStep={activeStep} sx={{ padding: "20px" }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
              {activeStep === 0 ? (
                // Shopping Address Form
                <>
                  <Typography variant="subtitle1">Shopping Address</Typography>
                  <Grid container spacing={1} sx={{ marginTop: "10px" }}>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <TextField
                        name="username"
                        label="Username"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        value={userInfo.username}
                        onChange={handleUserInfoChange}
                        required
                      />
                      <TextField
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        value={userInfo.email}
                        onChange={handleUserInfoChange}
                        required
                      />
                      <TextField
                        name="phone"
                        label="Phone"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        value={userInfo.phone}
                        onChange={handleUserInfoChange}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <TextField
                        name="address"
                        label="Address"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        value={userInfo.address}
                        onChange={handleUserInfoChange}
                        required
                      />
                      <TextField
                        name="city"
                        label="City"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        value={userInfo.city}
                        onChange={handleUserInfoChange}
                        required
                      />
                      <TextField
                        name="country"
                        label="Country"
                        variant="outlined"
                        style={{ marginBottom: "10px" }}
                        value={userInfo.country}
                        onChange={handleUserInfoChange}
                        required
                      />
                    </Grid>
                  </Grid>
                </>
              ) : !isPaymentSuccess ? (
                // Payment Form Content
                <>
                  <Preview sx={{ padding: "10px" }} productItem={product} />
                  <Divider />
                  <Typography variant="subtitle1">Payment Method</Typography>
                  <FormControl sx={{ margin: "10px" }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={paymentMethod}
                      onChange={handlePaymentMethod}
                    >
                      <FormControlLabel
                        value="cash"
                        control={<Radio />}
                        label="Cash On Delivery"
                      />
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label="Pay With Card"
                      />
                    </RadioGroup>
                  </FormControl>
                  {paymentMethod === "card" && (
                    <div
                      style={{
                        border: "1px solid #d4d4d4",
                        borderRadius: "4px",
                        padding: "10px",
                        width: "100%",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <CardElement options={cardElementOptions} />
                    </div>
                  )}
                </>
              ) : (
                // Shopping Address Form
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" color="primary">
                      Your Order is Successfully Placed!
                    </Typography>
                    <a href="/">
                      <Button variant="contained">Go Home Page</Button>
                    </a>
                  </div>
                </div>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 10px",
                }}
              >
                <div>
                  {activeStep > 0 && (
                    <Button
                      onClick={handleBack}
                      style={{
                        display: !isPaymentSuccess ? "block" : "none",
                      }}
                    >
                      Back
                    </Button>
                  )}
                </div>
                <div>
                  {activeStep === steps.length - 1 && !isPaymentSuccess && (
                    <Button onClick={handlePayment} disabled={isPaymentLoading}>
                      {isPaymentLoading ? "Processing..." : "Finish"}
                    </Button>
                  )}
                  {activeStep < steps.length - 1 && (
                    <Button type="submit">Next</Button>
                  )}
                </div>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PaymentForm;
