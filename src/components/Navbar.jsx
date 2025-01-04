import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Slider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ onSearch, onPriceRangeChange }) {
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchClick = () => {
    onSearch(searchText);
  };

  const handlePriceRangeChange = (event, newRange) => {
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#333", // Dark ash-grey background
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        color: "#f5f5f5", // White text color
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#f5ebe0", // Light ash-grey logo color
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
          }}
        >
          MyShop
        </Typography>

        {/* Desktop Layout */}
        {!isMobile && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexGrow: 1,
              }}
            >
              {/* Search Bar */}
              <TextField
                size="small"
                placeholder="Search by name or category"
                variant="outlined"
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#f5ebe0" }, // Light ash-grey border
                    "&:hover fieldset": { borderColor: "#f5ebf1" }, // Hover effect
                  },
                }}
                onChange={(e) => setSearchText(e.target.value)}
              />

              {/* Search Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f5ebf1", // Light ash-grey button background
                  color: "#333", // Dark text for contrast
                  "&:hover": { backgroundColor: "#f5ebe0" },
                }}
                onClick={handleSearchClick}
              >
                Search
              </Button>
            </Box>

            {/* Price Range Slider */}
            <Box sx={{ width: 300, color: "#f5f5f5" }}>
              <Typography variant="body2" gutterBottom>
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                sx={{
                  color: "#f5ebe0", // Light ash-grey slider
                  "& .MuiSlider-thumb": { backgroundColor: "#f5ebf1" }, // Thumb color
                  "& .MuiSlider-rail": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              />
            </Box>
          </>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <TextField
                  size="small"
                  placeholder="Search by name or category"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </MenuItem>
              <MenuItem>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f5ebf1", // Light ash-grey button background
                    color: "#333", // Dark text for contrast
                    "&:hover": { backgroundColor: "#f5ebe0" },
                  }}
                  fullWidth
                  onClick={handleSearchClick}
                >
                  Search
                </Button>
              </MenuItem>
              <MenuItem>
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body2" gutterBottom>
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    sx={{
                      color: "#f5ebe0", // Light ash-grey slider
                      "& .MuiSlider-thumb": { backgroundColor: "#f5ebf1" },
                      "& .MuiSlider-rail": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  />
                </Box>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
