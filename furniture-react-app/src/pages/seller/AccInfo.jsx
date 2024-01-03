import React, { useState, useEffect } from "react";
import axios from "axios";
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
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function AccInfo() {
  const [userData, setUserData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/users/userInfo/${username}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

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
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Information
          </Typography>
          {userData ? (
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={userData.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    value={userData.fname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    value={userData.lname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    value={userData.phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="street"
                    label="Street"
                    name="street"
                    value={userData.street}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    value={userData.city}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    value={userData.state}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    id="zipCode"
                    label="Zip Code"
                    name="zipCode"
                    value={userData.zipCode}
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <p>Loading user data...</p>
          )}
        </Box>
      </Container>
    </div>
  );
}
