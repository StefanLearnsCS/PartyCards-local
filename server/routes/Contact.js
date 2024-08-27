const express = require('express');
const router = express.Router();
const { Contact } = require("../models");
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 5 requests per windowMs
    message: "Too many contact requests from this IP, please try again later."
});

router.post('/', contactLimiter, async (req, res) => {
    const { firstName, lastName, email, message, honeyPot } = req.body;
    
    if (honeyPot) {
        return res.status(400).json({ error: "Spam detected!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email address." });
    }
    
    try {
        const newContact = await Contact.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message,
        });

        res.status(201).json({ message: "Contact message created successfully"});
    } catch (error) {
        console.error('Error during contact creation:', error);
        res.status(500).json({ error: "An error occurred while creating the contact message" });
    }
    
});

module.exports = router;