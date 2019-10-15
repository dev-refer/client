import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Fab } from '@material-ui/core'

import swal from 'sweetalert2'
import axios from '../../libs/axios'

import {
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
} from '@material-ui/core'
import Loading from '../Loading'


const useStyles1 = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

const theme = createMuiTheme();



export default function ScrollDialog(props) {
    const { open, closeModal, scroll, categoryId, categoryName } = props
    const classes = useStyles1();
    const classes2 = useStyles()

    const [spots, setSpot] = React.useState([])
    const [dataCount, setDataCount] = React.useState(0)
    const [offset, setOffset] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [loading, setLoading] = React.useState(false)
    const [chipData, setChipData] = React.useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const result = await axios({
                    method: 'GET',
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    url: `/v1/spots?order=ASC&sort=id&page=${page}&categoryExclude=${categoryId}`
                })
                let filtered;
                if (chipData.length === 0) {
                    filtered = result.data.data.filter(val => {
                        val.show = false
                        return val
                    })
                } else {
                    filtered = result.data.data.filter(val => {
                        let status = 0
                        chipData.filter(datum => {
                            if (datum.id === val.id) {
                                status++
                            }
                        })
                        if (status) {
                            val.show = true
                        } else {
                            val.show = false
                        }
                        return val
                    })
                }

                setSpot(filtered);
                setDataCount(result.data.data_size)
                setLoading(false)
                return result
            } catch (error) {
                swal.fire({
                    title: 'ERROR',
                    type: 'error',
                    text: error.message
                })
            }
        }
        fetchData()
    }, [page, categoryId])

    const handleAdd = (id, name) => {
        setSpot(spots.filter(spot => {
            if (spot.id == id) {
                spot.show = true
            }
            return spot
        }))
        setChipData([...chipData, { id: id, name: name }])
    }
    const handleClose = () => {
        closeModal()
        setSpot([])
        setDataCount(0)
        setOffset(0)
        setChipData([])
    };
    const handleDelete = chipToDelete => () => {
        setSpot(spots.filter(val => {
            if (val.id === chipToDelete.id) {
                val.show = false
            }
            return val
        }))
        setChipData(chips => chips.filter(chip => chip.id !== chipToDelete.id));
    };
    const handlePage = (offset) => {
        setOffset(offset)
        let pageFilter = (offset + 10) / 10
        setPage(pageFilter)
    }

    const handlePost = () => {
        if (chipData.length === 0) {
            return alert('Please Add Spot First')
        }
        const spotId = []
        chipData.forEach(val => {
            spotId.push(val.id)
        })
        setLoading(true)
        axios({
            method: 'POST',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                spotId: spotId,
                categoryId: Number(categoryId)
            },
            url: '/v1/categories/bulk-insert-spot'
        })
            .then(res => {
                setLoading(false)
                handleClose()
                swal.fire({
                    type: 'success',
                    text: 'spot added'
                })
            })
            .catch(err => {
                setLoading(false)
                swal.fire({
                    type: 'error',
                    title: 'ERROR WHILE POST DATA',
                    text: err.message
                })
            })

    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                maxWidth='md'
            >
                {
                    loading
                        ? <Loading />
                        : null
                }
                <DialogTitle id="scroll-dialog-title">{categoryName}</DialogTitle>
                <Paper style={{ width: '100%', minHeight: '100px' }}>
                    {
                        chipData.map(data => {
                            let icon;

                            if (data.label === 'React') {
                                icon = <TagFacesIcon />;
                            }
                            return (
                                <Chip
                                    key={data.id}
                                    icon={icon}
                                    label={data.name}
                                    onDelete={handleDelete(data)}
                                    className={classes.chip}
                                />
                            );
                        })
                    }
                </Paper>
                <DialogContent dividers={scroll === 'paper'}>
                    <Table className={classes2.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell >City</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            spots.length !== 0 ? <TableBody>
                                {spots.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell >
                                            {row.number}
                                        </TableCell>
                                        <TableCell >
                                            {row.name}
                                        </TableCell>
                                        <TableCell >{row.city}</TableCell>
                                        <TableCell align="center">  <button disabled={row.show} onClick={() => { handleAdd(row.id, row.name) }} type="button" className="btn btn-secondary mb-2">+</button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody> : null
                        }

                    </Table>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <Pagination
                            limit={10}
                            offset={offset}
                            total={dataCount ? dataCount : 10}
                            onClick={(e, offset) => handlePage(offset)}
                        />
                    </MuiThemeProvider>
                </DialogContent>
                <DialogActions>
                    <Fab onClick={handleClose} style={{ backgroundColor: '#e3e2de', color: 'black', marginTop: 20, minWidth: '100px' }} variant="extended" aria-label="delete">
                        Discard
            </Fab>
                    <Fab onClick={handlePost} style={{ backgroundColor: '#fd6a02', color: '#f2efef', marginTop: 20, minWidth: '100px', marginLeft: 20 }} variant="extended" aria-label="delete">
                        Submit
                            </Fab>

                </DialogActions>
            </Dialog>
        </div>
    );
}
