import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Box,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Slice/userSlice";

export const EcommerceLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '5px',
            },
          },
        },
      },
    },
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(login({ username, email }));
    navigate("/ShoppingCart");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
          backgroundImage: isMobile ? "none" : "url('two.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: isMobile ? "#f5f5f5" : "transparent",
          padding: isMobile ? 2 : 0,
        }}
      >
        <Paper
          elevation={isMobile ? 1 : 3}
          sx={{
            border: isMobile ? "none" : "3px solid rgb(95, 92, 92)",
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "100%" : 500,
            maxWidth: "95vw",
            minHeight: isMobile ? "auto" : 320,
            backgroundColor: "white",
            padding: isMobile ? 3 : 4,
            position: "relative",
            borderRadius: isMobile ? "8px" : "4px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgb(95, 92, 92)",
              color: "white",
              width: isMobile ? "100%" : 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: isMobile ? 0 : -5.3,
              marginLeft: isMobile ? 0 : 0.5,
              marginBottom: isMobile ? 3 : 6,
              padding: isMobile ? "12px 0" : "16px 0",
              borderRadius: isMobile ? "4px 4px 0 0" : "0",
              position: isMobile ? "static" : "relative",
              top: isMobile ? 0 : -20,
              left: isMobile ? 0 : -20,
            }}
          >
            <Typography variant={isMobile ? "subtitle1" : "h6"}>ECOMMERCE LOGIN</Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: "" });
              }}
              error={!!errors.username}
              helperText={errors.username}
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              error={!!errors.email}
              helperText={errors.email}
              size={isMobile ? "small" : "medium"}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "rgb(23, 8, 241)",
                borderRadius: "4px",
                width: isMobile ? "100%" : 100,
                height: 40,
                marginTop: isMobile ? 2 : 0,
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};