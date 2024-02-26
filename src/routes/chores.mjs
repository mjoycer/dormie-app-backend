import { Router } from 'express';
import { verify } from '../auth.js';
import { Chores } from '../mongoose/schema/chores.mjs'

const router = Router();

router.get('/', verify, (req, res) => {
    Chores.find().then(data => {
        res.send(data.filter(chore => chore.users.includes(req.body.id)));
    });
});

router.post('/', verify, (req, res) => {
    let newChore = new Chores(req.body);

    newChore.save().then(data => {
        res.send(data);
    });
});

router.put('/:id', verify, (req, res) => {
    Chores.findByIdAndUpdate(req. params.id, req.body).then(data =>{
        res.send('Record updated');
    });
});


export default router