import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9999/api/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.user.role === "admin") {
        localStorage.setItem("jwt_token", response.data.token);
        localStorage.setItem("role", "admin");
        navigate("/admin/home");
      } else {
        setError("You are not authorized as an admin.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}
      >
        Admin Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "#333",
            "&:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}

export default AdminLogin;
