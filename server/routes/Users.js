const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const {validateToken} = require("../middleware/AuthMiddleware")
const {sign} = require('jsonwebtoken')
const passport = require('passport');
  require('../middleware/passport');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        res.json("SUCCESS");
    })
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) {
        res.json({ error: "User Doesn't Exist" });
      }else {
           bcrypt.compare(password, user.password).then((match) => {
              if (!match) {
                  res.json({ error: "Wrong Username And Password Combination" });
              } else {
                  const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
                  res.json({token: accessToken, username: username, id: user.id});
              }
          }); 
      }
  });
  
  router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
  
  router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }), 
    (req, res) => {
      const accessToken = sign({username: req.user.username, id: req.user.id}, "importantsecret");;  // Function to generate JWT
      const username = req.user.username;
      const id = req.user.id;
      res.redirect(`http://localhost:3000/login?token=${accessToken}&username=${username}&id=${id}`);
    }
  );

  router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
  });

  router.get('/basicinfo/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const basicInfo = await Users.findByPk(id, { attributes: { exclude: ['password'] } });

        if (!basicInfo) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(basicInfo);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;