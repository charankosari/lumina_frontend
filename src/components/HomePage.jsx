import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    category: "Electronics",
    name: "Laptop",
    price: 50000,
    img: "https://via.placeholder.com/150",
    description: "A high-performance laptop suitable for gaming and work.",
  },
  {
    id: 2,
    category: "Electronics",
    name: "Mobile Phone",
    price: 20000,
    img: "https://via.placeholder.com/150",
    description: "Latest smartphone with all the features you need.",
  },
  {
    id: 3,
    category: "Clothing",
    name: "T-Shirt",
    price: 500,
    img: "https://via.placeholder.com/150",
    description: "Comfortable cotton t-shirt for casual wear.",
  },
  {
    id: 4,
    category: "Clothing",
    name: "Jeans",
    price: 1500,
    img: "https://via.placeholder.com/150",
    description: "Stylish denim jeans for every occasion.",
  },
  {
    id: 5,
    category: "Home Appliances",
    name: "Microwave",
    price: 10000,
    img: "https://via.placeholder.com/150",
    description: "High-power microwave for fast cooking.",
  },
];

function Homepage({ searchQuery, priceRange }) {
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const categories = [
    ...new Set(filteredProducts.map((product) => product.category)),
  ];

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (productId) => {
    console.log("Product added to cart:", productId);
  };

  const handleBuyNow = (productId) => {
    console.log("Buy Now for product:", productId);
    navigate(`/checkout/${productId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      {categories.length > 0 ? (
        categories.map((category) => (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: "#2E3B4E",
              }}
            >
              {category}
            </Typography>
            <Grid container spacing={2}>
              {filteredProducts
                .filter((product) => product.category === category)
                .map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        border: "1px solid #B0BEC5",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.img}
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ color: "#2E3B4E" }}>
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontWeight: "bold", color: "#64B5F6" }}
                        >
                          ₹{product.price}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, display: "flex", flexDirection: "row" }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#00b4d8",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#00b4d8" },
                            mr: 1,
                          }}
                          fullWidth
                          onClick={() => handleAddToCart(product.id)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#388E3C" },
                          }}
                          fullWidth
                          onClick={() => handleBuyNow(product.id)}
                        >
                          Buy Now
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        ))
      ) : (
        <Typography variant="h6" color="error">
          No products found matching your search or price range.
        </Typography>
      )}
    </Box>
  );
}

export default Homepage;
