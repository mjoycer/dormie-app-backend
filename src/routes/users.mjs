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

    Users.find().then(data => {
        res.status(200).send(data);
    });
});

router.post('/register', checkSchema(createUserValidationSchema), async(req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).send({errors: result.array()});

    const data = matchedData(req);
    const saltRounds = 10;
    let hashedPwd = bcrypt.hashSync(data.password, saltRounds);
    data.password = hashedPwd;

    let newUser = new Users(data);
    try {
        await newUser.save().then(data => {
            res.status(201).send('User has been created.');
        });
    } catch(err) {
        return res.status(400).send({err: err.message})
    }
});



export default router;