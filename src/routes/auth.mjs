import passport from "passport";
import { Users } from "../mongoose/schema/users.mjs";
import { Router } from "express";

const router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

router.post('/logout', (req, res) => {
    if(!req.user) return res.sendStatus(401);
    req.logout((err) => {
        if(err) return res.sendStatus(400);
        res.sendStatus(200)
    })
})

router.get('/status', (req, res) => {
    return req.user 
    ? res.status(200).send(req.user) 
    : res.status(401).send({msg: "Not authenticated."})
    
})

export default router;