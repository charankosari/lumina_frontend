import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making API request
    setSuccessMessage(""); // Reset success message

    if (!email || !phone || !password || !name) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/api/user/register",
        {
          email,
          number: phone,
          password,
          name,
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Registration successful! You can now login.");
        // Optionally redirect after successful registration
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after registration
        }, 2000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  required
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                </Grid>
              )}
              {successMessage && (
                <Grid item xs={12}>
                  <Typography color="primary" variant="body2">
                    {successMessage}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#4CAF50",
                    "&:hover": { backgroundColor: "#388E3C" },
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterPage;
