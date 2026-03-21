const express = require("express");
const User = require("./user.model");
const logger = require("../utils/logger");
const { registerValidation, loginValidation } = require("../middleware/validation");
const router = express.Router();

// Register endpoint
router.post("/register", registerValidation, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // We force the role to be "user" here so people can't hack it to become an admin
    const user = new User({ email, username, password, role: "user" });
    
    // Save to database
    await user.save();
    
    logger.info(`User registration successful: ${username} (${email})`);
    
    // Send a success response back to frontend
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`, { stack: error.stack });
    res.status(500).send({ message: "Error registering user" });
  }
});

const generateToken = require("../middleware/generateToken");

// Login user endpoint
router.post("/login", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // First, find if a user with this email actually exists in the DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    // Next, check if the provided password matches the hashed password in the DB
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    // If password is correct, generate an authentication token (JWT)
    const token = await generateToken(user._id);
    
    logger.info(`User logged in: ${email}`);
    // Set the token inside an HTTP-only cookie for better security
    res.cookie("token", token, {
      httpOnly: true, // Prevents Javascript from reading the token
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-site cookie settings
      maxAge: 24 * 60 * 60 * 1000, // Token will expire in 1 day
    });

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        address: user.address,
      },
    });
  } catch (error) {
    logger.error("Error logging in", { stack: error.stack });
    res.status(500).send({ message: "Error logging in" });
  }
});

// Logout user endpoint
router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .status(200)
    .send({ message: "Logged out successfully" });
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id); // delete user
    // check if user exists
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // user deleted massage
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    logger.error("Error deleting user", { stack: error.stack });
    res.status(500).send({ message: "Error deleting user" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      {},
      "id username email role profileImage bio profession address",
    ).sort({ createdAt: -1 }); // find all users (sort by createdAt latest to oldest)
    res.status(200).send(users);
  } catch (error) {
    logger.error("Error getting users", { stack: error.stack });
    res.status(500).send({ message: "Error getting users" });
  }
});

// Update User role
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User role updated successfully", user });
  } catch (error) {
    logger.error("Error updating user role", { stack: error.stack });
    res.status(500).send({ message: "Error updating user role" });
  }
});

// Edit or Update User Profile
router.patch("/edit-profile", async (req, res) => {
  try {
    const { userId, username, profileImage, bio, profession, address } = req.body;
    
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }
    
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    
    // Only update the fields that were actually sent in the request (avoiding undefined values overriding data)
    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;
    if (address !== undefined) user.address = address;

    // Save the updated user to DB
    await user.save();
    
    // Return the updated data so the frontend can update its state
    res.status(200).send({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error("Error updating user profile", { stack: error.stack });
    res.status(500).send({ message: "Error updating user profile" });
  }
});

module.exports = router;
