const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: 'You are not authorized'});
    }
    // Break down the token `Bearer token`
    const token = authorization.split(' ')[1];
    
    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findOne({ _id }).select('_id');

        if (!req.user) {
            return res.status(401).json({ error: "User not found" });
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "You must be logged in" });
    }
};

module.exports = requireAuth;