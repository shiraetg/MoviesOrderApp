import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar as MuiToolbar, Typography, Button, IconButton, Box } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Toolbar() {

    // Get user id and role in order to display different items in toolbar
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole') === 'true';

    const handleLogout = () => {
        // Clear session storage
        sessionStorage.clear();

        // Navigate to the login page
        window.location.href = '/';
    };

    return (
        <AppBar position="static">
            <MuiToolbar sx ={{backgroundColor: '#86FCD7'}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Link to={`/profile`}>
                        <Button sx={{ color: 'white' }}>Profile</Button>
                    </Link>
                    <Link to={`/${userId}/loan-history`}>
                        <Button sx={{ color: 'white' }}>Loan History</Button>
                    </Link>
                    <Link to={`/cart`}>
                        <Button sx={{ color: 'white' }}>Cart</Button>
                    </Link>
                    {userRole && (
                        <Link to={`/user-management`}>
                            <Button sx={{ color: 'white' }}>User Management</Button>
                        </Link>
                    )}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Link to="/api/movies" style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" sx={{ color: 'white', fontSize: '26px', margin: '0', textAlign: 'left', paddingLeft: '16px' }}>
                            Movies Order System
                        </Typography>
                    </Link>
                </Box>
                <IconButton onClick={handleLogout} color="inherit">
                    <ExitToAppIcon />
                </IconButton>
            </MuiToolbar>
        </AppBar>
    );
}

export default Toolbar;
