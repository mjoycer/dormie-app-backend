import passport from "passport";
import { Users } from "../mongoose/schema/users.mjs";
import { Router } from "express";

const router = Router();

router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.sendStatus(200);
    // let user = await Users.findOne({ email: req.body.email });
    
    // if (user) {
    //     let match = await bcrypt.compare(req.body.password, user.password);
    //     if (match) {
    //         const auth = createAccessToken(user);
    //         req.session.user = user;
    //         console.log('Login succesful');
    //         console.log(req.session.user);
    //         return res.send({ auth: auth, user: user });
    //     } else {
    //         return res.status(401).send({ error: 'Invalid Login' });
    //     }
    // } else {
    //    return res.send({ error: 'Email not found' });
    // }
});

router.get('/status', (req, res) => {
    return req.session.user 
    ? res.status(200).send(req.session.user) 
    : res.status(401).send({msg: "Not authenticated."})
    
})

export default router;