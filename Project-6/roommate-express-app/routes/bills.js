const router = require('express').Router();
const Bills = require('../models/bills');
const UserBills = require('../models/userBills');
const Users = require('../models/users');

const auth = require('../auth');

router.get('/', auth.verify, async (req, res) => {
    Bills.find().then(data => {
        res.send(data.filter(bill => bill.unpaidUsers.includes(req.body.id) || bill.paidUsers.includes(req.body.id)));
    });
});


router.post('/', auth.verify, (req, res) => {
    let newBill = new Bills(req.body);

    newBill.save().then(data => {
        res.send(data);
    });
});

router.put('/:id', auth.verify, (req, res) => {
    Bills.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.send('Record updated');
    });
});


module.exports = router;