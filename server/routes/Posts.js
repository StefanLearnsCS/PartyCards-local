const express = require('express');
const router = express.Router();
const { Posts, Likes } = require("../models");
const {validateToken} = require("../middleware/AuthMiddleware");


router.get('/', validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({include: [Likes]});
    const likedPosts = await Likes.findAll({where: {UserId: req.user.id}})
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Posts.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.clickCount += 1;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    const username = req.user.username;
    post.username = username;
    post.UserId = req.user.id
    const newPost = await Posts.create(post);
    const { id } = newPost;

    res.json({id, post});
});

router.delete('/:postId', validateToken, async (req, res) => {
    const postId = req.params.postId
    
    await Posts.destroy({where: {
        id: postId,},
    });

    res.json("DELETED SUCCESSFULLY");
});

router.get('/byuserId/:id', validateToken, async (req, res) => {
    const id = req.params.id;
    try {
        const listOfPosts = await Posts.findAll({ where: { UserId: id }, include: [Likes] });

        const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });

        const ulikedPosts = await Likes.findAll({ where: { UserId: req.params.id } });

        const likedPostIds = ulikedPosts.map(like => like.PostId);

        const userLikedPosts = await Posts.findAll({ where: { id: likedPostIds }, include: [Likes] });

        res.json({ listOfPosts, likedPosts, userLikedPosts });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;