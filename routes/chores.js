const auth = require('../auth');
const router = require('express').Router();
const Chores = require('../models/chores');

router.get('/', auth.verify, (req, res) => {
    Chores.find().then(data => {
        res.send(data.filter(chore => chore.users.includes(req.body.id)));
    });
});

router.post('/', auth.verify, (req, res) => {
    let newChore = new Chores(req.body);

    newChore.save().then(data => {
        res.send(data);
    });
});

router.put('/:id', auth.verify, (req, res) => {
    Chores.findByIdAndUpdate(req. params.id, req.body).then(data =>{
        res.send('Record updated');
    });
});


module.exports = router;