import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

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
    },
    editIcon: {
        color: '#fd6a02',
        cursor: 'pointer'
    },
    deleteIcon: {
        color: 'grey'
    }
}));

export default function CustomizedTables(props) {
    const classes = useStyles();

    const editSpot = (item) => {
        props.edit.push(`/edit-spot/${item.id}`)
        props.test(item)
        console.log(item);
    }

    const pushEdit = () => {

    }

    console.log(props, 'props di table');
    return (
        <Container maxWidth="xl">
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width="5%">No.</StyledTableCell>
                            <StyledTableCell width="20%" align="left">Name</StyledTableCell>
                            <StyledTableCell width="15%" align="left">Country</StyledTableCell>
                            <StyledTableCell width="15%" align="left">City</StyledTableCell>
                            <StyledTableCell align="left">Category</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((item, i) => (
                            <StyledTableRow >
                                <StyledTableCell width="5%" component="th" scope="row" key={i}>{i + 1}</StyledTableCell>
                                <StyledTableCell align="left">{item.name}</StyledTableCell>
                                <StyledTableCell align="left">{item.country}</StyledTableCell>
                                <StyledTableCell align="left">{item.city}</StyledTableCell>
                                <StyledTableCell>
                                    {item.categoryNames.map(val => {
                                        return val.name + ', '
                                    })}
                                </StyledTableCell>
                               <StyledTableCell>
                                   <CreateIcon className={classes.editIcon} onClick={() => editSpot(item)} x={props.item} />
                                   <DeleteIcon className={classes.deleteIcon}/>
                               </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}