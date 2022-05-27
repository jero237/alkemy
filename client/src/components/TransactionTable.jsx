import { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Typography, IconButton, TextField } from '@mui/material';
import { Container } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';

const URL = process.env.REACT_APP_API_URL

export default function TransactionTable({ transactions, isHome, reloadTransactions }) {

    const matches = useMediaQuery('(max-width:768px)');
    const [editTransaction, setEditTransaction] = useState(null);
    const [form, setForm] = useState({
        amount: '',
        description: ''
    });

    const handleEdit = (id, description, amount) => {
        editTransaction !== id ? setEditTransaction(id) : setEditTransaction(null)
        setForm({
            id,
            amount,
            description
        })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        setEditTransaction(null);
        console.log(form)
        axios.put(`${URL}/transaction`, form)
            .then(res => {
                console.log(res)
                reloadTransactions()
            })
            .catch(err => console.log(err))
    }


    const table = (type) => {
        return (
            <TableContainer component={Paper} >
                <Toolbar>
                    <Typography variant='h6'>{type === 'out' ? "Paid" : "Received"}</Typography>
                </Toolbar>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Edit</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            {/* <TableCell>Category</TableCell> */}
                            <TableCell align="right">{type === 'out' ? "Out" : "In"}</TableCell>
                            {editTransaction && <TableCell>Submit</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.filter(e => e.type === type).map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <IconButton size='small' onClick={() => handleEdit(row.id, row.description, row.amount)}>
                                        {editTransaction === row.id ? <CancelIcon fontSize='small' /> : <EditIcon fontSize='small' />}
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell>{editTransaction !== row.id ? row.description :
                                    <TextField
                                        name='description'
                                        size='small'
                                        variant='standard'
                                        value={form.description}
                                        onChange={handleChange}
                                    />
                                }</TableCell>
                                {/* <TableCell>{row.category}</TableCell> */}
                                <TableCell align="right">{editTransaction !== row.id ? `$${row.amount}` :
                                    <TextField
                                        name='amount'
                                        size='small'
                                        variant='standard'
                                        value={form.amount}
                                        onChange={handleChange}
                                    />
                                }</TableCell>
                                {editTransaction && <TableCell>
                                    {editTransaction === row.id && <IconButton size='small' onClick={handleSubmit}>
                                        <SendIcon />
                                    </IconButton>}
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    if (isHome) return (
        <TableContainer component={Paper} sx={{ marginBottom: "2rem" }} >
            <Toolbar>
                <Typography variant='h6'>Recent transactions</Typography>
            </Toolbar>
            <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        {/* <TableCell>Category</TableCell> */}
                        <TableCell align="right">Out</TableCell>
                        <TableCell align="right">In</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.slice(0, 10).map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell>{row.description}</TableCell>
                            {/* <TableCell>{row.fat}</TableCell> */}
                            <TableCell align="right">{row.type === "out" && `$${row.amount}`}</TableCell>
                            <TableCell align="right">{row.type === "in" && `$${row.amount}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <Container sx={{ display: "flex", gap: "1rem", flexWrap: matches && 'wrap' }} >
            {table('out')}
            {table('in')}
        </Container>
    )

}
