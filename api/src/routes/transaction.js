const express = require('express');
const router = express.Router();
const Transaction = require('../models/index').sequelize.models.transaction;

router.get('/', (req, res) => {
    Transaction.findAll({
        where: {
            userId: req.user.id
        }
    })
        .then(transactions => res.send(transactions))
        .catch(err => res.status(500).send(err))
})

router.post('/', (req, res) => {
    console.log(req.body)
    Transaction.create({
        userId: req.user.id,
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date,
        type: req.body.type
    })
        .then(transaction => res.send(transaction))
        .catch(err => res.status(500).send(err))
})

router.delete('/', (req, res) => {
    Transaction.destroy({
        where: {
            id: req.body.id,
            userId: req.user.id
        }
    })
        .then(transaction => res.send(transaction))
        .catch(err => res.status(500).send(err))
})

router.put('/', (req, res) => {
    Transaction.update({
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date,
        type: req.body.type
    }, {
        where: {
            id: req.body.id,
            userId: req.user.id
        }
    })
        .then(transaction => res.send(transaction))
        .catch(err => res.status(500).send(err))
})

module.exports = router;