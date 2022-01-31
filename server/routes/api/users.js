const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//model
const User = require('../../model/User');

//@POST
//Public route
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    //simple validation
    if(!name || !email || !password) {
        res.status(400).json({msg:'All fields required'});
    }

    //check and register the user if not already
    User.findOne({email: email}).then(async (user) => {
        if(user) {
            res.status(400).json({msg:'User already exists'});
        }

        const newUser = new User({
            name,
            email,
            password
        })

        //create salt and then hash
        const salt = await bcrypt.genSalt(11);
        const hashedPwd = await bcrypt.hash(newUser.password, salt);
    
        newUser.password = hashedPwd;
        newUser.save().then((user) => {
            jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600}, (err, token) => {
                if(err) throw err;
    
                res.json({
                    token: token,
                    user: { id: user.id, name: user.name, email: user.email }
                })
                
            });
            
        });
        
    })
})

module.exports = router;