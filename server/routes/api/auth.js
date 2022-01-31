const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//for continuosly validating the token
const auth = require('../../middleware/auth');

//Model
const User = require('../../model/User');

//@POST
//Public route
router.post('/', (req, res) => {
    const { email, password } = req.body;
    //simple validation
    if(!email || !password) {
        res.status(400).json({msg:'All fields required'});
    }

    //check and register the user if not already
    User.findOne({email: email}).then(async (user) => {
        if(!user) {
            res.status(400).json({msg:'This email is not registered'});
        }

        //check if the credentails are correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(400).json({msg:'Incorrect Password'});
        } else {
            jwt.sign({id: user.id}, config.get('jwtSecret'), {expiresIn: 3600}, (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                })
            })
        }
        
    })
})

//@GET
// Private route
// api/auth/user
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password').then(user => res.json(user));
})

module.exports = router;