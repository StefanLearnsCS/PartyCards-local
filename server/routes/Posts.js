const express = require('express');
const router = express.Router();
const { Posts } = require("../models");

router.get('/', async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);

    post.clickCount += 1;
    await post.save();

    res.json(post)
});

router.post('/', async (req, res) => {
    const post = req.body;
    const newPost = await Posts.create(post);
    const { id } = newPost;

    res.json({id, post});
});

module.exports = router;