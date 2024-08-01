require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token
module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('No auth header found');
    return res.status(401).json({
      status: 'error',
      message: 'Access Denied: No Token Provided!'
    });
  }

  const token = authHeader.split(' ')[2]; // Mengambil token setelah "Bearer"
  if (!token) {
    console.log('No token found');
    return res.status(401).json({
      status: 'error',
      message: 'Access Denied: Malformed Token!'
    });
  }

  console.log('Received Token:', token); // Debug log

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Gunakan kunci rahasia yang sama dengan yang digunakan untuk membuat token
    console.log('Token verified:', verified); // Debug log
    req.user = verified;
    next();
  } catch (err) {
    console.log('Invalid token:', err.message); // Debug log
    res.status(400).json({
      status: 'error',
      message: 'Invalid Token'
    });
  }
};
