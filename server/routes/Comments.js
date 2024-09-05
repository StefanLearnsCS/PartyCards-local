const express = require('express');
const router = express.Router();
const { Comments } = require("../models");
const {validateToken} = require("../middleware/AuthMiddleware");
const rateLimit = require('express-rate-limit');


const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 5 requests per windowMs
    message: "Too many contact requests from this IP, please try again later."
});

router.post('/', [validateToken, contactLimiter] , async (req, res) => {
    const comment = req.body;
    try {
        const username = req.user.username;
        comment.username = username;
        const newComment = await Comments.create(comment);
        res.json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
});

router.get('/:packId', async (req, res) => {
    const packId = req.params.packId;
    const comments = await Comments.findAll({ where : { packId: packId} });
    res.json(comments)
});

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId

    await Comments.destroy({where: {
        id: commentId,},
    });

    res.json("DELETED SUCCESSFULLY");

});

module.exports = router;