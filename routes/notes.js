const router = require('express').Router();
const Notes = require('../models/notes');
const auth = require('../auth');

router.get('/', auth.verify, (req, res) => {
    Notes.find().then(data => {
        // console.log(data);
        res.send(data);
    });
});

router.post('/', auth.verify, (req, res) => {
    let newNote = new Notes(req.body);

    newNote.save().then( data => {
        res.send(data);
    });
});

router.delete('/:id', auth.verify, (req,res) => {
    Notes.deleteOne({_id: req.params.id}).then(data => {
        if (data.deletedCount > 0) {
            res.send('Record Deleted');
        }else{
            res.send('Record not found.');
        }
    });
});

router.put('/:id', auth.verify, (req, res) => {
    Notes.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.send('Record updated');
    });
});

module.exports = router;