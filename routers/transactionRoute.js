const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const moment = require('moment');


router.post('/add-transaction', async function (req, res) {
    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        res.send('Transaction added successfully');
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


router.post('/edit-transaction', async function (req, res) {
    try {
        await Transaction.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload);
        res.send('Transaction updated successfully');
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/delete-transaction', async function (req, res) {
    try {
        await Transaction.findOneAndDelete({_id: req.body.transactionId});
        res.send('Transaction deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/get-all-transactions', async (req, res) => {
    const { frequency, selectRange, type } = req.body;
    try {
        const transactions = await Transaction.find({
            ...(frequency !== 'custom' ? 
            {
                date: {
                    $gt: moment().subtract(req.body.frequency, 'days').toISOString(),
                },
            } : {
                date: {
                    $gt: moment(selectRange[0]).toISOString(),
                    $lt: moment(selectRange[1]).toISOString(),
                }
            }),
            userid: req.body.userid,
            ...(type !== 'all' && {type})
        }); // Use userid to fetch transactions
        res.send(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// In your transactionRoutes.js or a similar file
router.get('/total-spent/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const totalSpent = await Transaction.aggregate([
            { $match: { userid: userId, type: 'Expense' } },
            { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } }
        ]);
        res.json(totalSpent);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;