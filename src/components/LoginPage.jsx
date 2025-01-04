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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making API request

    if (!emailOrPhone || !password) {
      setError("Please enter both email/phone and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/api/user/login",
        {
          email: emailOrPhone,
          number: emailOrPhone,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.jwtToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email/phone or password.");
    }
  };

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
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email or Phone"
                  variant="outlined"
                  fullWidth
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  type="text"
                  required
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2">
                    {error}
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
          <p>
            Didn't have an account <a href="/register">create one</a>{" "}
          </p>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
