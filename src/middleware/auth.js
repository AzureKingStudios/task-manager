const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismynewcourse');
    //tokens.token is a string because a special character is being used
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

    if(!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch(e) {
    res.status(401).send({error: 'please authenticate'});
  }
};

module.exports = auth;
