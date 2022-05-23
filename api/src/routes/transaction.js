const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Transaction');
})

router.delete('/', (req, res) => {
    res.send('Transaction');
})

router.put('/', (req, res) => {
    res.send('Transaction');
})

module.exports = router;