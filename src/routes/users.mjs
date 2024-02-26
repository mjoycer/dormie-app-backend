import { Router } from 'express';
import { Users } from '../mongoose/schema/users.mjs'
import bcrypt from 'bcrypt';
import { verify, createAccessToken } from '../auth.js'
import { query, validationResult, checkSchema, matchedData } from 'express-validator';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';


const router = Router();

router.get('/', async (req, res) => {
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) {
            console.log(err);
            throw (err);
        }
        console.log(sessionData);
    });
    // const result = validationResult(req);
    // if(!result.isEmpty()) return res.status(400).send({ errors: result.array() });

    // const getUsers = await Users.findOne({ email: value });
    // if(!getUsers) return res.status(404).send('User not found.');

    // return res.status(200).send(getUsers);
    Users.find().then(data => {
        res.status(200).send(data);
    });
});

router.post('/email-exists', checkSchema(createUserValidationSchema), async (req, res) => {
    const result = validationResult(req);
    console.log(result);

    const data = matchedData(req);
    console.log(data);
    await Users.findOne({ email: req.body.email }).then(data => {
        if (data) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
});

router.post('/register', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    
    if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const auth = createAccessToken(user);
            req.session.user = user;
            console.log('Login succesful');
            console.log(req.session.user);
            return res.send({ auth: auth, user: user });
        } else {
            return res.status(401).send({ error: 'Invalid Login' });
        }
    } else {
       return res.send({ error: 'Email not found' });
    }
});

router.get('/status', (req, res) => {
    return req.session.user 
    ? res.status(200).send(req.session.user) 
    : res.status(401).send({msg: "Not authenticated."})
    
})


export default router;