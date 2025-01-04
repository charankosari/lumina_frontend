import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/HomePage";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import AdminPage from "./components/AdminPages/AdminLogin";
import AdminHome from "./components/AdminPages/AdminHome";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const ProtectedRoute = ({ element, isAdminRoute = false }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || typeof token !== "string") {
      window.location.href = "/login"; // Redirect to login if no token
      return null;
    }

    return element;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={
                <>
                  <Navbar
                    onSearch={handleSearch}
                    onPriceRangeChange={handlePriceRangeChange}
                  />
                  <Homepage searchQuery={searchQuery} priceRange={priceRange} />
                </>
              }
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminPage />} isAdminRoute />}
        />
        <Route
          path="/admin/home"
          element={<ProtectedRoute element={<AdminHome />} isAdminRoute />}
        />
      </Routes>
    </Router>
  );
}

export default App;
