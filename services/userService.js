'use strict';
const User = require('../models/User')

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
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
function createUser(username, password, scope) {
    // Create a User
    const user = new User({
        username,
        password,
        scope
    });
    // Save User in the database
    return user.save();
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
function updateUser(userId, userName, userPrice) {
    return (User.findByIdAndUpdate(userId, {
        username: userName,
        password: userPrice
    }, {new: true}));
}




