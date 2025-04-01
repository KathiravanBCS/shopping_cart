import React, { useState } from "react";
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Slice/cartSlice";
import MenuIcon from '@mui/icons-material/Menu';

export const ShoppingCart = () => {
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const products = [
    { id: 1, name: "Bread 100% Whole Wheat", image: "bread.jpg", category: "Bakery", price: 35 },
    { id: 2, name: "Carrot-Local", image: "carrot.jpg", category: "Vegetables", price: 20 },
    { id: 3, name: "Onion-Medium/Vengayam", image: "onion.jpg", category: "Vegetables", price: 25 },
    { id: 4, name: "Apple", image: "apple.jpg", category: "Fruits", price: 50 },
    { id: 5, name: "Dessert", image: "dessert.jpg", category: "Desserts", price: 60 },
    { id: 6, name: "Flakes", image: "flakes.jpg", category: "Breakfast", price: 40 },
  ];

  const handleCategoryChange = (category) => {
    if (category === "All Categories") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
      );
    }
  };

  const filteredProducts = selectedCategories.length
    ? products.filter((product) => selectedCategories.includes(product.category))
    : products;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = createTheme({
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            flexGrow: 1,
          },
        },
      },
    },
  });

  const categoriesContent = (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Categories</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedCategories.length === 0}
              onChange={() => handleCategoryChange("All Categories")}
            />
          }
          label="All Categories"
          labelPlacement="start"
          sx={{ justifyContent: "space-between", margin: 0 }}
        />
        {[...new Set(products.map((product) => product.category))].map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
            labelPlacement="start"
            sx={{ justifyContent: "space-between", margin: 0 }}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3 }}>
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        
        <Grid container spacing={3}>
          {/* Sidebar / Categories - Desktop */}
          {!isMobile && (
            <Grid item xs={12} md={3}>
              {categoriesContent}
            </Grid>
          )}

          {/* Sidebar / Categories - Mobile Drawer */}
          {isMobile && (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
              }}
              sx={{
                '& .MuiDrawer-paper': { 
                  boxSizing: 'border-box',
                  width: 240,
                },
              }}
            >
              {categoriesContent}
            </Drawer>
          )}

          {/* Product List */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {filteredProducts.map((product) => {
                const cartItem = cartItems.find((item) => item.id === product.id);
                return (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      height: "100%",
                      padding: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 3
                      }
                    }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.image}
                        alt={product.name}
                        sx={{ 
                          objectFit: "contain", 
                          width: "100%", 
                          maxHeight: "140px",
                          margin: "10px auto"
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary">{product.category}</Typography>
                        <Typography variant="h6" sx={{ margin: '10px 0' }}>${product.price}</Typography>
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          gap: 1, 
                          marginTop: 1 
                        }}>
                          {cartItem ? (
                            <>
                              <Button 
                                variant="contained" 
                                size="small"
                                onClick={() => dispatch(removeFromCart(product.id))}
                              >
                                -
                              </Button>
                              <Typography>{cartItem.quantity}</Typography>
                              <Button 
                                variant="contained" 
                                size="small"
                                onClick={() => dispatch(addToCart(product))}
                              >
                                +
                              </Button>
                            </>
                          ) : (
                            <Button 
                              variant="contained" 
                              fullWidth
                              onClick={() => dispatch(addToCart(product))}
                            >
                              ADD TO CART
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};