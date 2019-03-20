const config = require('config');
const jwt = require('jsonwebtoken');


function auth (req, res, next){
    const token = req.header('x-auth-token');

    if(!token)
        return res.status(400).send({message: 'Authorization failed, no token found'});

    try {
        // verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({message:'Invalid Token'});
    }
}

module.exports = auth;