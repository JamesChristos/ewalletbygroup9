const express = require('express');
const Budget = require('../models/Budget');
const router = express.Router();

router.post('/add_budgets', async (req, res) => {
    try {
        const newBudget = new Budget(req.body);
        await newBudget.save();
        res.status(201).send('Budget created successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/get-all-budgets', async (req, res) => {
    try {
        const userId = req.query.userId;
        const budgets = await Budget.find({ userId: userId });
        res.send(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/edit_budget', async (req, res) => {
    try {
        const userId = req.body.userId;
        const budgetId = req.body.budgetId;

        const updatePayload = {
            amount: req.body.amount,
            endDate: req.body.endDate,
            remainingDays: req.body.remainingDays,
            category: req.body.category,
            description: req.body.description,
            // Add other fields as needed
        };

        await Budget.findOneAndUpdate({ _id: budgetId, userId: userId }, updatePayload);

        res.send('Budget updated successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/delete_budget', async (req, res) => {
    try {
        const budgetId = req.body.budgetId; // Get the budgetId from the request body
        await Budget.findOneAndDelete({ _id: budgetId }); // Use _id to identify the specific budget
        res.send('Budget deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



module.exports = router;