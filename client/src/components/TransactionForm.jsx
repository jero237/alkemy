import { useState } from 'react'
import { Button, Container, Paper, TextField, ToggleButtonGroup, ToggleButton, CircularProgress, InputAdornment, OutlinedInput, InputLabel, FormControl, } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios'

const URL = process.env.REACT_APP_API_URL

function TransactionForm({ reloadTransactions, location }) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [form, setForm] = useState({
        amount: '',
        description: '',
        date: null,
        type: "out"
    })



    const handleChange = e => {
        if (!e) return
        if (e instanceof Date) return setForm({ ...form, date: e });
        if (["in", "out"].includes(e.target.value)) return setForm({ ...form, type: e.target.value })
        console.log(e.target.name)
        console.log(e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (!form.amount || form.amount < 0 || !form.description || !form.date) return setError(true)
        setLoading(true)
        axios.post(`${URL}/transaction`, form)
            .then(res => {
                console.log(res)
                setLoading(false)
                setForm({
                    amount: '',
                    description: '',
                    date: null,
                    type: "out"
                })
                reloadTransactions()
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setForm({
                    amount: 0,
                    description: '',
                    date: new Date(),
                    type: "out"
                })
            })
    }

    return (
        <Container>
            <Paper sx={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date"
                        inputFormat="MM/dd/yyyy"
                        value={form.date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    variant='outlined'
                    label='Description'
                    type='text'
                    name='description'
                    autoComplete='off'
                    value={form.description}
                    onChange={handleChange}
                    error={error && !form.description}
                />
                <FormControl sx={{ maxWidth: "10em" }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                        label='Amount'
                        type='number'
                        name='amount'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                        inputProps={{ min: 0 }}
                        value={form.amount}
                        onChange={handleChange}
                        error={error && !form.amount}
                    />
                </FormControl>
                <ToggleButtonGroup
                    value={form.type}
                    exclusive
                    onChange={handleChange}
                    aria-label="text alignment"
                    name="type"
                >
                    <ToggleButton value="out" name="out">
                        Out
                    </ToggleButton>
                    <ToggleButton value="in" name="in">
                        In
                    </ToggleButton>
                </ToggleButtonGroup>

                <Button variant='contained' color='primary' onClick={handleSubmit} disabled={loading} >{loading ? <CircularProgress /> : "Add Transaction"}</Button>
            </Paper>
        </Container>
    )
}

export default TransactionForm