const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const User = require('../models/User');
const userService = require('../services/userService')

// POST request to authenticate User.
/**
 * @route   GET api/auth
 * @desc    Authenticate user
 * @access  Public
 */
router.post('/', authenticateUser);
/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */
router.get('/user', auth, getUserData);

module.exports = router;

function authenticateUser(req, res) {
    const {email, password} = req.body;
    // Validate request
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Fields email or password can not be empty"
        });
    }

    // Check for existing user
    User.findOne({email})
        .then(user => {
            if (!user) return res.status(400).json({msg: 'User Does not exist'});

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),
                        {expiresIn: 3600},
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the User."
            });
        });
}

function getUserData (req, res){
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.send(user));
}

