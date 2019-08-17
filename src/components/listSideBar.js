import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import AddIcon from '@material-ui/icons/Add';
import SpotIcon from '@material-ui/icons/LocationOn'
import { ListSubheader } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const mainListItems = (
    <div>
        <ListSubheader>
            Category
        </ListSubheader>
        <Link style={{ color: 'inherit' }} to='/dashboard/create-category'>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Create Category" />
            </ListItem>
        </Link>
        <ListItem button >
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Category List" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader>
            Spots
        </ListSubheader>
        <Link style={{ color: 'inherit' }} to='/dashboard/spot'>
            <ListItem button>
                <ListItemIcon>
                    <SpotIcon />
                </ListItemIcon>
                <ListItemText primary="Spot" />
            </ListItem>
        </Link>
        <Link style={{color:'inherit'}} to='/dashboard/create-spot'>
            <ListItem button>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Spot" />
            </ListItem>
        </Link>

    </div>
);