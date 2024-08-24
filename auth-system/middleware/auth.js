
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (roles = []) => {

  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
 
    const token = req.header('x-auth-token');

   
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
     
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      const user = await User.findById(req.user.id);

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ msg: 'Access denied: You do not have the required role' });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

module.exports = auth;
