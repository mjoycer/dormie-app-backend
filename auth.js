const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY || 'lovesong';

const createAccessToken = user => {
    let data = {
        id: user.id,
        email: user.email,
    }

    return jwt.sign(data, secret);
}

const decode = (token) => {
    if (typeof token !== 'undefined') {
        jwt.verify(token, secret, (err, data) => {
            return err ? null : jwt.decode(token, { complete: true }).payload
        });
    } else {
        return null;
    }
}

const verify = (req, res, next) => {
    if (!req.headers.authorization) {
        res.send('No token');
    } else {
        let token = req.headers.authorization.split(" ")[1];
        if (typeof (token) !== 'undefined') {
            jwt.verify(token, secret, (err, decoded) => {
                req.body.id = decoded.id;
                return err ? res.send("Invalid token") : next();
            });
        } else {
            return res.send('Token undefined');
        }
    }
}

module.exports = {
    createAccessToken,
    decode,
    verify
};