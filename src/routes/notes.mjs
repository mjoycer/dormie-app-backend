// const router = require('express').Router();
// const Notes = require('../models/notes');
// const auth = require('../auth');

import { Router } from 'express';
import { verify } from '../auth.js'
import { Notes } from '../mongoose/schema/notes.mjs'


const router = Router();

router.get('/', verify, (req, res) => {
    Notes.find().then(data => {
        res.send(data);
    });
});

router.post('/', verify, (req, res) => {
    let newNote = new Notes(req.body);

    newNote.save().then( data => {
        res.send(data);
    });
});

router.delete('/:id', verify, (req,res) => {
    Notes.deleteOne({_id: req.params.id}).then(data => {
        if (data.deletedCount > 0) {
            res.send('Record Deleted');
        }else{
            res.send('Record not found.');
        }
    });
});

router.put('/:id', verify, (req, res) => {
    Notes.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.send('Record updated');
    });
});

export default router