import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/List'
import SpotIcon from '@material-ui/icons/LocationOn'
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined'
// import { ListSubheader } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const mainListItems = (
    <div>
        <Link style={{ color: 'inherit' }} to='/dashboard/category'>
        <ListItem button >
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
        </ListItem>
        </Link>
        <Link style={{ color: 'inherit' }} to='/dashboard/spot'>
            <ListItem button>
                <ListItemIcon>
                    <SpotIcon />
                </ListItemIcon>
                <ListItemText primary="Spot" />
            </ListItem>
        </Link>
        <Link style={{ color: 'inherit' }} to='/dashboard/test'>
            <ListItem button>
                <ListItemIcon>
                    <SpotIcon />
                </ListItemIcon>
                <ListItemText primary="Test" />
            </ListItem>
        </Link>    
    </div>
);

export const secondaryListItems = (
    <div>
            <ListItem button>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
            </ListItem>
    </div>
);