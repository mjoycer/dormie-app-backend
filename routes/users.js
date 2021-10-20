const router = require('express').Router();
const Users = require('../models/users');
const UserBills = require('../models/userBills');

const bcrypt = require('bcrypt');
const auth = require('../auth');

router.get('/', auth.verify, (req, res) => {
    Users.find().then(data => {
        res.send(data);
    });
});

router.post('/email-exists', (req, res) => {
    Users.findOne({ email: req.body.email }).then(data => {
        if (data) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
});

router.post('/register', async (req, res) => {
    try {
        let hashedPwd = await bcrypt.hash(req.body.password, 10);
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd
        }

        let newUser = new Users(user);
        newUser.save().then(data => {
            res.send('User has been created.');
        });
    } catch {
        console.log(err);
    }

});

router.post('/login', async (req, res) => {
    try {

        let user = await Users.findOne({ email: req.body.email });

        if (user) {
            let match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                res.send({ auth: auth.createAccessToken(user) });
                console.log('Login succesful');
            } else {
                res.send({ error: 'Invalid Login' });
            }
        } else {
            res.send({ error: 'Email not found' });
        }
    } catch {
        console.log(err);
    }
});


module.exports = router;