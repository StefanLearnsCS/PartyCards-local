const express = require('express');
const router = express.Router();
const { Cards } = require("../models");

router.post('/', async (req, res) => {
    const card = req.body;
    try {
        const newCard = await Cards.create(card);
        res.json(newCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create card' });
    }
});

module.exports = router;