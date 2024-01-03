import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import SellerNav from "./SellerNav";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ContactPageIcon from '@mui/icons-material/ContactPage';

const StyledForm = styled("form")({
  maxWidth: "400px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  marginTop: "20px",
});

const EditUserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    fname: "",
    lname: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/users/userInfo/${username}`
        );
        setUserData(response.data);
        setFormData({
          username: username,
          fname: response.data.fname,
          lname: response.data.lname,
          phone: response.data.phone,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
          zipCode: response.data.zipCode,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5001/users/edit/${username}`, formData);
      console.log("User information updated successfully");

      toast.success("Account info updated successfully", {
        position: "top-right",
        autoClose: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error updating account info:", error);
      toast.error("Failed to update account info", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div style={{marginBottom:'30px'}}>
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
            <ContactPageIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit User Information
          </Typography>
          {userData ? (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={formData.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    value={formData.fname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    value={formData.lname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    required
                    fullWidth
                    id="street"
                    label="Street"
                    name="street"
                    value={formData.street}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    value={formData.city}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    required
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    value={formData.state}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    required
                    fullWidth
                    id="zipCode"
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, bgcolor: "#0a1d37"}}
              >
                Save Changes
              </Button>
            </Box>
          ) : (
            <p>Loading user data...</p>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default EditUserInfo;
