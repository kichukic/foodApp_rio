import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const authMiddleware = (req, res, next) => {
  const authtoken = req.header('Authorization') || req.query.token || req.body.token;
  let token = authtoken.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};



const isAdminAuth = (req, res, next) => {
  try {
  const authtoken = req.header('Authorization') || req.query.token || req.body.token;
  let token = authtoken.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.isAdmin === true){
      next();
    }else if(decoded.isAdmin === false ){
      return res.status(401).json({ message: 'Unauthorized: You are not an admin' });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

export default{ authMiddleware, isAdminAuth}
