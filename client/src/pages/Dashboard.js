import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import ManageTransactions from '../components/ManageTransactions';
import Loading from '../components/Loading';

const URL = process.env.REACT_APP_API_URL

function Dashboard() {

    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [transactions, setTransactions] = useState([])
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)

    const reloadTransactions = () => {
        setUpdate(!update)
    }

    useEffect(() => {
        axios.get(`${URL}/auth/user`)
            .then(res => {
                if (!res.data) return navigate("/")
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        axios.get(`${URL}/transaction`)
            .then(res => {
                setLoading(false)
                setTransactions(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
            })
            .catch(err => console.log(err))
    }, [update])

    if (loading) return <Loading />

    return (
        <>
            {user && <Nav name={user.name} />}
            {transactions && <Routes>
                <Route path="/" element={<Home transactions={transactions} />} />
                <Route path='manage-transactions' element={<ManageTransactions transactions={transactions} reloadTransactions={reloadTransactions} />} />
            </Routes>}
        </>
    )
}

export default Dashboard