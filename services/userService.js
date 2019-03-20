'use strict';
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    authenticateUser
};

/**
 * Get all available users
 * Returns all the users
 *
 * returns Users
 **/
function getAllUsers() {
    return User.find();
}

/**
 * Find User by ID
 * Returns a single user
 *
 * userId String ID of order that needs to be fetched
 * returns User
 **/
function getUserById(user_id) {
    return User.findById(user_id);
}

/**
 * Add a new user to the store
 *
 *
 * body User User object that needs to be added to the store
 * no return value expected for this operation
 **/
async function createUser(name, email, password, role) {
    // Check for existing User
    const user = await User.findOne({email});
    if (!user) {
        const newUser = new User({
            name,
            email,
            password,
            role
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save();
            })
        });
        return newUser;
    }
}

/**
 * Deletes an user from store
 *
 *
 * userId String User id to delete
 * api_key String  (optional)
 * no return value expected for this operation
 **/
function deleteUser(userId) {
    return User.findByIdAndRemove(userId);
}

/**
 * Updates an existing user in the store
 *
 *
 * userId String ID of user that needs to be updated
 * body User User object to update
 * no return value expected for this operation
 **/
function updateUser(userId, name, email, password, role) {
    return (User.findByIdAndUpdate(userId, {
        name,
        email,
        password,
        role
    }, {new: true}));
}

/**
 * Authenticate a user
 *
 *
 * body User object that needs to be authenticated
 *
 **/
async function authenticateUser(res, name, email, password) {
    const user = await User.findOne({email});

    if (user) {
        //validate user
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    return res.status(400).send({
                        message: "Invalid credentials"
                    })
                }
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
                                    email: user.email,
                                }
                            }
                        )
                    }
                )
            })
    } else {
        return res.status(400).send({message: "User does not exist"})
    }
}



