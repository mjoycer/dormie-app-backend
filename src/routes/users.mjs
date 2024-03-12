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

// router.post('/email-exists', checkSchema(createUserValidationSchema), async (req, res) => {
//     const result = validationResult(req);
//     console.log(result);

//     const data = matchedData(req);
//     console.log(data);
//     await Users.findOne({ email: req.body.email }).then(data => {
//         if (data) {
//             res.send(true);
//         } else {
//             res.send(false);
//         }
//     });
// });

router.post('/register', checkSchema(createUserValidationSchema), (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).send({errors: result.array()});

    const data = matchedData(req);
    const saltRounds = 10;
    let hashedPwd = bcrypt.hashSync(data.password, saltRounds);
    data.password = hashedPwd;

    let newUser = new Users(data);
    newUser.save().then(data => {
        res.status(201).send('User has been created.');
    });
});


router.get('/status', (req, res) => {
    return req.session.user 
    ? res.status(200).send(req.session.user) 
    : res.status(401).send({msg: "Not authenticated."})
    
})


export default router;