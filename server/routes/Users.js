const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const {validateToken} = require("../middleware/AuthMiddleware")
const {sign} = require('jsonwebtoken')
const passport = require('passport');
require('../middleware/passport');

router.post('/', async (req, res) => {
    const { username, password, email, googleId } = req.body;

    try {
        // Check if email or username already exists
        const existingUser = await Users.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const existingUsername = await Users.findOne({ where: { username: username } });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already taken" });
        }

        // If registering with Google, check if the Google ID already exists
        if (googleId) {
            const existingGoogleUser = await Users.findOne({ where: { googleId: googleId } });
            if (existingGoogleUser) {
                return res.status(400).json({ error: "Google account already linked" });
            }
        }

        // Hash the password (only if password is provided)
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const uniqueId = Math.floor(1000 + Math.random() * 9000);

        // Create the new user
        const newUser = await Users.create({
            username:`${username}#${uniqueId}`,
            password: hashedPassword,
            email: email,
            googleId: googleId || null,
        });

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error('Error during user creation:', error);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await Users.findOne({ where: { email: email } });
  
    if (!user) {
        res.json({ error: "Wrong Username And Password Combination!" });
      }else {
           bcrypt.compare(password, user.password).then((match) => {
              if (!match) {
                  res.json({ error: "Wrong Username And Password Combination!" });
              } else {
                  const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
                  res.json({token: accessToken, username: user.username, id: user.id});
              }
          }); 
      }
  });
  
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
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