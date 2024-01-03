import * as React from "react";
import { useParams } from "react-router-dom"; // Add this import for handling route parameters
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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerNav from "./SellerNav";
import Inventory2Icon from "@mui/icons-material/Inventory2";

export default function EditProduct() {
  const {} = useParams();

  const { productId, username } = useParams();
  const [file, setFile] = React.useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [product, setProduct] = React.useState({
    title: "",
    category: "",
    image_link: "",
    mrp: 0,
    tax: 0,
    shipping_cost: 0,
    street: "",
    city: "",
    state: "",
    zipCode: 0,
    quantity: 0,
    seller_id: username,
    shortDesc:"",
    description:""
  });

  React.useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/products/details/${productId}`
        );
        setProduct({
          ...product,
          title: response.data.title,
          category: response.data.category,
          image_link: response.data.image_link,
          mrp: response.data.price.mrp,
          tax: response.data.price.tax,
          shipping_cost: response.data.price.shipping_cost,
          street: response.data.product_address.street,
          city: response.data.product_address.city,
          state: response.data.product_address.state,
          zipCode: response.data.product_address.zipCode,
          quantity: response.data.quantity,
          description:response.data.description,
          shortDesc:response.data.shortDesc

        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();


    const productData = new FormData();

    productData.append("title", product.title);
    productData.append("category", product.category);
    productData.append("seller_id", username);

    productData.append("mrp", parseFloat(product.mrp));
    productData.append("tax", parseFloat(product.tax));
    productData.append(
      "shipping_cost",
      parseFloat(product.shipping_cost));

    productData.append("street", product.street);
    productData.append("city", product.city);
    productData.append("state", product.state);
    productData.append("zipCode", product.zipCode);
    productData.append("quantity", parseInt(product.quantity));
    productData.append("username", username);
    productData.append("image_link", product.image_link);
    productData.append("description", product.description);
    productData.append("shortDesc", product.shortDesc);

    productData.append('image123',file)


    try {
      const response = await axios.put(
        `http://localhost:5001/products/edit/${productId}`,
        productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product updated successfully:", response.data);

      toast.success("Product updated successfully", { autoClose: 5 });
      // history.push(`/products/details/${productId}`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product", { autoClose: 10 });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
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
            Edit Product
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {/* Similar form fields as in AddProduct component */}
            {/* ... */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={product.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  value={product.category}
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
                {product && <p>Selected file: {product?.image_link?.substring(0, 20) }</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="mrp"
                  label="MRP"
                  name="mrp"
                  type="number"
                  value={product.mrp}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="tax"
                  label="Tax"
                  name="tax"
                  type="number"
                  value={product.tax}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="shipping_cost"
                  label="Shipping Cost"
                  name="shipping_cost"
                  type="number"
                  value={product.shipping_cost}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={product.description}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="shortDesc"
                  label="Short Description"
                  name="shortDesc"
                  value={product.shortDesc}
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  value={product.street}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={product.city}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  value={product.state}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  name="zipCode"
                  type='number'
                  value={product.zipCode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={product.quantity}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
