import { Container } from "@mui/material"
import TransactionForm from "./TransactionForm"
import TransactionTable from "./TransactionTable"

export default function ManageTransactions({ transactions, reloadTransactions }) {
    return (
        <Container sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <TransactionForm reloadTransactions={reloadTransactions} />
            <TransactionTable transactions={transactions} reloadTransactions={reloadTransactions} />
        </Container>
    )
}
