const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
  try {
    // First, try to get the token from cookies (browser)
    let token = req.cookies.token;

    // If no cookie, try to get it from the Authorization header (postman, mobile app)
    if (!token) {
      const authHeader = req.headers["authorization"];
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7); // Remove 'Bearer ' prefix
      }
    }

    if (!token) {
      return res.status(401).send({ message: "No token provided, access denied" });
    }

    // Decode the token using our secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ message: "Token not valid" });
    }

    // Attach user info to the request object so next routes can use it
    req.userId = decoded.userId;
    req.role = decoded.role;
    
    // Go to the next middleware or route handler
    next();
  } catch (error) {
    logger.error("Error While verifying token", { stack: error.stack });
    res.status(401).send({ message: "Error While verifying token" });
  }
};

module.exports = verifyToken;
