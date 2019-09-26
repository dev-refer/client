import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#484848',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('1', 'Warung Fotkop', 'Indonesia', 'Jakarta', 'Food & Drink, Coffeeshop'),
    createData('2', 'Warung Fotkop', 'Indonesia', 'Jakarta', 'Food & Drink, Coffeeshop'),
    createData('3', 'Warung Fotkop', 'Indonesia', 'Jakarta', 'Food & Drink, Coffeeshop'),
    createData('4', 'Warung Fotkop', 'Indonesia', 'Jakarta', 'Food & Drink, Coffeeshop'),
    createData('5', 'Warung Fotkop', 'Indonesia', 'Jakarta', 'Food & Drink, Coffeeshop'),
];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tHead: {
        backgroundColor: '#484848'
    }
}));

export default function CustomizedTables() {
    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width="5%">No.</StyledTableCell>
                            <StyledTableCell width="20%"align="left">Name</StyledTableCell>
                            <StyledTableCell width="15%" align="left">Country</StyledTableCell>
                            <StyledTableCell width="15%" align="left">City</StyledTableCell>
                            <StyledTableCell align="left">Category</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell width="5%"component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.calories}</StyledTableCell>
                                <StyledTableCell width="10%" align="left">{row.fat}</StyledTableCell>
                                <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="left">{row.protein}</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}