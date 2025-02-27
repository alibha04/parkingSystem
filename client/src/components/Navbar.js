import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Switch
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Navbar = ({ toggleTheme, darkMode }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ width: '100%' }}>
      <Toolbar>
        <IconButton onClick={() => navigate(-1)} color="primary" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>

        {/* Clickable Title with Opposite Theme Hover Effect */}
        <Typography
          variant="h5"
          component="div"
          onClick={() => navigate('/')}
          sx={{
            flexGrow: 1,
            color: 'primary.main',
            fontWeight: 'bold',
            fontFamily: '"Poppins", sans-serif',
            letterSpacing: 1.5,
            cursor: 'pointer',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
              color: darkMode ? '#6200ea' : '#00ffc6', // Opposite theme color
            },
          }}
        >
          Parking System
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Theme Toggle Switch */}
          <Switch checked={darkMode} onChange={toggleTheme} />

          {/* Dropdown Menu */}
          <IconButton onClick={handleMenuOpen} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={RouterLink} to="/add-slot" onClick={handleMenuClose}>
              Create Lot
            </MenuItem>
            <MenuItem component={RouterLink} to="/slots" onClick={handleMenuClose}>
              Lot List
            </MenuItem>
            <MenuItem component={RouterLink} to="/search" onClick={handleMenuClose}>
              Search Lot
            </MenuItem>
            <MenuItem component={RouterLink} to="/qrcodes" onClick={handleMenuClose}>
              Download Token
            </MenuItem>
            <MenuItem component={RouterLink} to="/about" onClick={handleMenuClose}>
              About
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
