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
    const post = await Posts.findByPk(id);

    post.clickCount += 1;
    await post.save();

    res.json(post)
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
    const listOfPosts = await Posts.findAll({ where: { UserId: id }, include: [Likes] });
    const likedPosts = await Likes.findAll({where: {UserId: req.user.id}})
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts})
});

module.exports = router;