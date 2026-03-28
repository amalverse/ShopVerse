const logger = require("../utils/logger");

const verifyAdmin = (req, res, next) => {
  // Check if the user is an admin based on the role we got from the token
  if (req.role === "admin") {
    next(); // They are admin, let them proceed
  } else {
    logger.warn(`Unauthorized admin access attempt by user ${req.userId || 'unknown'} with role ${req.role || 'none'}`);
    // If they aren't an admin, send a 403 Forbidden error
    res
      .status(403)
      .send({
        success: false,
        message: "You are not authorized to perform this admin action",
      });
  }
};

module.exports = verifyAdmin;
