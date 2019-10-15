import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Paper from '@material-ui/core/Paper';
import { Button, Table, TableBody, TableCell, TableRow, TableHead, } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import _ from 'lodash';


import axios from '../../libs/axios';
import swal from 'sweetalert2'

const theme = createMuiTheme();

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

export default function ChipsArray(props) {
    const classes = useStyles1();
    const classes2 = useStyles()
    const categoryId = props.match.params.id
    const [spots, setSpot] = React.useState([])
    const [dataCount, setDataCount] = React.useState(0)
    const [offset, setOffset] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [loading, setLoading] = React.useState(false)
    const [chipData, setChipData] = React.useState([
    ]);
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

    const handlePage = (offset) => {
        setOffset(offset)
        let pageFilter = (offset + 10) / 10
        setPage(pageFilter)
    }
    const handleDelete = chipToDelete => () => {
        setSpot(spots.filter(val => {
            if (val.id === chipToDelete.id) {
                val.show = false
            }
            return val
        }))
        setChipData(chips => chips.filter(chip => chip.id !== chipToDelete.id));
    };
    
    const handleAdd = (id, name) => {
        setSpot(spots.filter(spot => {
            if (spot.id == id) {
                spot.show = true
            }
            return spot
        }))
        setChipData([...chipData, { id: id, name: name }])
    }

    const handlePost = () => {
        if (chipData.length === 0) {
            return swal.fire({
                type: 'info',
                text: 'Please Add Spot First'
            })
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
        <div className='container'>
            <h6>
                add spot to >>> category
            </h6>
            {chipData.length !== 0 ? <Paper className={classes.root}>
                {chipData.map(data => {
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
                })}
            </Paper> : null}
            <Button onClick={handlePost} color='primary' style={{ marginTop: 20 }}>
                Submit
            </Button>
            <hr />
            <div className="row">
                <div className="col-md-12">
                    <Paper className={classes2.root}>
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
                    </Paper>
                </div>
                <div className="col-md-12">
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline />
                        <Pagination
                            limit={10}
                            offset={offset}
                            total={dataCount ? dataCount : 10}
                            onClick={(e, offset) => handlePage(offset)}
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        </div>

    );
}