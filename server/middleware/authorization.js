import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export default function async (req, res, next) {
  try {

    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).json('Not Authorize');
    }

    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();

  } catch (err) {
    console.error(err.message);
    return res.status(403).json( msg: 'Not Authorized' );
  }
}