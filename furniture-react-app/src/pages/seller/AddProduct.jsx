import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerNav from "./SellerNav";

export default function AddProduct() {
  const { username } = useParams();

  const [file, setFile] = React.useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);

      const productData = new FormData();

      productData.append("title", data.get("title"));
      productData.append("category", data.get("category"));
      productData.append("seller_id", username);

      productData.append("mrp", parseFloat(data.get("mrp")));
      productData.append("tax", parseFloat(data.get("tax")));
      productData.append(
        "shipping_cost",
        parseFloat(data.get("shipping_cost"))
      );

      productData.append("street", data.get("street"));
      productData.append("city", data.get("city"));
      productData.append("state", data.get("state"));
      productData.append("zipCode", parseInt(data.get("zipCode")));
      productData.append("quantity", parseInt(data.get("quantity")));
      productData.append("username", username);
      productData.append("description", data.get("description"));
      productData.append("shortDesc", data.get("shortDesc"));

      productData.append('image123',file)


      // Make the Axios POST request to your API
      const response = await axios.post(
        "http://localhost:5001/products/add",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show success toast
      toast.success("Product added successfully", {
        position: "top-right",
        autoClose: 100, // Close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      event.target.reset();
      // You can redirect the user to another page or handle success in your desired way
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Handle the error, show a message to the user, etc.
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <SellerNav username={username} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#0a1d37" }}>
            <Inventory2Icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                />
              </Grid>
              <Grid item xs={12}>
                <label>
                  Image:
                  <input
                    type="file"
                    name="image123"
                    onChange={handleFileChange}
                  />
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mrp"
                  label="MRP"
                  name="mrp"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tax"
                  label="Tax"
                  name="tax"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="shipping_cost"
                  label="Shipping Cost"
                  name="shipping_cost"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="shortDesc"
                  label="Short Description"
                  name="shortDesc"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  name="zipCode"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  type="number"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:"#0a1d37" }}
            >
              Add Product
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}
