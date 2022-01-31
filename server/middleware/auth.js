const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    //check for token
    if(!token) 
        return res.send(401).json({msg:'Token not found, authorized denied'});

    try {
        //verify the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //add user from payload
        req.user = decoded;
        next();   
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid'})
    }
}

module.exports = auth;