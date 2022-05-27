import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function TransactionTable({ transactions, isHome }) {

    const matches = useMediaQuery('(max-width:768px)');

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
            <TableContainer component={Paper} >
                <Toolbar>
                    <Typography variant='h6'>Paid</Typography>
                </Toolbar>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            {/* <TableCell>Category</TableCell> */}
                            <TableCell align="right">Out</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.filter(e => e.type === "out").map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                {/* <TableCell>{row.fat}</TableCell> */}
                                <TableCell align="right">${row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} sx={{ marginBottom: "2rem" }} >
                <Toolbar>
                    <Typography variant='h6'>Received</Typography>
                </Toolbar>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            {/* <TableCell>Category</TableCell> */}
                            <TableCell align="right">In</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.filter(e => e.type === "in").map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                {/* <TableCell>{row.fat}</TableCell> */}
                                <TableCell align="right">${row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )

}
