const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//model
const Item = require('../../model/Item');

//@GET
router.get('/', (req, res) => {
    //query on model
    Item.find()
        .sort({ date: -1 })
        .then(item => res.json(item))
})

//@POST
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
    });

    newItem.save().then( item => res.json(item));
})

//@DELETE
router.delete('/:id', auth, (req, res) => {
    //find the element first
    Item.findById(req.params.id)
        .then(item => item.remove().then( () => res.json({ success: true})))
        .catch((err) => res.status(404).json({ success: false }))

})

module.exports = router;