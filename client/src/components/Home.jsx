import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system'
import Header from './Header'
import TransactionTable from './TransactionTable'


export default function Home({ transactions }) {



    return (
        <Container sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <Header balance={transactions.reduce((a, b) => {
                if (b.type === "in") return a + b.amount
                else return a - b.amount
            }, 0)} />
            <TransactionTable transactions={transactions} />
        </Container>
    )
}
