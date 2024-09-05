const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'avj%234aed%2A3jbk69%2A%23ack');
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message});
  }
};

module.exports = auth;