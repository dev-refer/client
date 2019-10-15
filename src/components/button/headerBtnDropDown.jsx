


import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    IconButton,
} from '@material-ui/core';
import {
    ArrowDropDown,
} from '@material-ui/icons';

export default function SimpleMenu({ router, logout }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandle = () => {
        logout()
        localStorage.clear()
        handleClose()
    }

    return (
        <div>
            <IconButton onClick={handleClick} color="inherit">
                <ArrowDropDown />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={logoutHandle}>Logout</MenuItem>
            </Menu>
        </div>
    );
}