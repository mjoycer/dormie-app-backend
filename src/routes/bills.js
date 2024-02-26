import { Router } from 'express';
import { Bills } from '../mongoose/schema/bills.mjs'
import { verify } from '../auth.js'

const router = Router();

router.get('/', verify, async (req, res) => {
    Bills.find().then(data => {
        res.send(data.filter(bill => bill.unpaidUsers.includes(req.body.id) || bill.paidUsers.includes(req.body.id)));
    });
});


router.post('/', verify, (req, res) => {
    let newBill = new Bills(req.body);

    newBill.save().then(data => {
        res.send(data);
    });
});

router.put('/:id', verify, (req, res) => {
    Bills.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.send('Record updated');
    });
});


export default router