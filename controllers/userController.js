const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const config = require('config');

// Routes

// GET request for list of all User items.
router.get('/', getAllUsers);

// POST request for creating User.
router.post('/', createUser);

// GET request for one User.
router.get('/:id', getUserById);

// DELETE request to delete User.
router.delete('/:id', deleteUser);

// PUT request to update User.
router.put('/:id', updateUser);

// POST request to register User.
router.post('/auth', authenticateUser);

module.exports = router;

/**
 *
 * Display list of all users.
 *
 */
function getAllUsers(req, res) {
    userService.getAllUsers()
        .then(users => res.send(users))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving users."
            });
        });
}

/**
 *
 * Display a specific user by id.
 *
 */
function getUserById(req, res) {
    userService.getUserById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Error retrieving user with id " + req.params.id
            });
        });
}

/*

/!**
 *
 * Handle user create on POST.
 *
 *!/
function createUser(req, res) {
    // Validate request
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Username or Password can not be empty"
        });
    }

    userService.createUser(req.body.email, req.body.password, req.body.role)
        .then(user => user ? res.json(user) : res.status(404).send({
            message: "User not found with id " + req.params.id
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the User."
            });
        });
}
*/

/**
 *
 * Display user delete form on GET.
 *
 */
function deleteUser(req, res) {
    userService.deleteUser(req.params.id)
        .then(user => user ? res.json({message: "User deleted successfully!"}) : res.status(404).send({
            message: "User not found with id " + req.params.id
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete user with id " + req.params.id
            });
        });
}

/**
 *
 *  Handle user update on PUT.
 *
 */
function updateUser(req, res) {
    // Validate Request
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).send({
            message: "Fields name, email or password can not be empty"
        });
    }
    userService.updateUser(req.params.id, req.params.name, req.body.email, req.body.password)
        .then(user => user ? res.json(user) : res.status(404).send({
            message: "User not found with id " + req.params.id
        })).catch(err => {
        return res.status(500).send({
            message: err.message || "Error updating user with id " + req.params.id
        });
    });
}

/**
 *
 * Handle user create on POST.
 *
 */
function createUser(req, res) {
    // Validate request
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).send({
            message: "Fields name, email or Password can not be empty"
        });
    }

    userService.createUser(req.body.name, req.body.email, req.body.password, req.body.role)
        .then(user => user ?
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
                                password: user.password
                            }
                        }
                    )
                }
            ) : res.status(400).send({
                message: "User already exists "
            }))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the User."
            });
        });
}

/**
 *
 * Handle user create on POST.
 *
 */
function authenticateUser(req, res) {
    // Validate request
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Fields email or password can not be empty"
        });
    }

    userService.authenticateUser(res, req.body.name, req.body.email, req.body.password, req.body.role)
        /*.then(user => user ?
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
            ) : res.status(400).send({
                message: "User doesn't exist "
            }))*/
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while creating the User."
            });
        });
}



