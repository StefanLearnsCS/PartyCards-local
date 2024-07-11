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

router.get('/:packId', async (req, res) => {
    const packId = req.params.packId;
    const cards = await Cards.findAll({ where : { packId: packId} });
    res.json(cards)
});
module.exports = router;