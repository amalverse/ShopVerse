const express = require("express");
const User = require("./user.model");
const logger = require("../utils/logger");
const { registerValidation, loginValidation } = require("../middleware/validation");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const passport = require("../middleware/passport");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const jwt = require("jsonwebtoken");

// Register endpoint
router.post("/register", registerValidation, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: "User with this email already exists" });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // We force the role to be "user" here so people can't hack it to become an admin
    const user = new User({ 
        email, 
        username, 
        password, 
        role: "user",
        verificationToken
    });
    
    // Save to database
    await user.save();
    
    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    const message = `Please verify your email by clicking the link: ${verificationUrl}`;
    const html = `<h1>Verify Your Email</h1>
                  <p>Thanks for joining ShopVerse! Please click the link below to verify your email:</p>
                  <a href="${verificationUrl}">${verificationUrl}</a>`;

    await sendEmail({
        email: user.email,
        subject: "ShopVerse Email Verification",
        message,
        html
    });

    logger.info(`User registration successful: ${username} (${email}). Verification email sent.`);
    
    // Send a success response back to frontend
    res.status(201).send({ message: "User registered successfully! Please check your email to verify your account." });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`, { stack: error.stack });
    res.status(500).send({ message: "Error registering user" });
  }
});

// Verify Email endpoint
router.get("/verify-email/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).send({ message: "Invalid or expired verification token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).send({ message: "Email verified successfully!" });
    } catch (error) {
        logger.error(`Error verifying email: ${error.message}`, { stack: error.stack });
        res.status(500).send({ message: "Error verifying email" });
    }
});

// Forgot Password endpoint
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: ${resetUrl}`;
        const html = `<h1>Reset Your Password</h1>
                      <p>You requested a password reset. Please click the link below to reset it:</p>
                      <a href="${resetUrl}">${resetUrl}</a>
                      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

        await sendEmail({
            email: user.email,
            subject: "ShopVerse Password Reset",
            message,
            html
        });

        res.status(200).send({ message: "Password reset link sent to your email." });
    } catch (error) {
        logger.error(`Error in forgot-password: ${error.message}`, { stack: error.stack });
        res.status(500).send({ message: "Error sending reset email" });
    }
});

// Reset Password endpoint
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).send({ message: "Invalid or expired reset token" });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).send({ message: "Password reset successful!" });
    } catch (error) {
        logger.error(`Error in reset-password: ${error.message}`, { stack: error.stack });
        res.status(500).send({ message: "Error resetting password" });
    }
});

// Google Auth initialization
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Auth callback
router.get("/google/callback", 
    passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login` }),
    async (req, res) => {
        try {
            const user = req.user;
            const token = await generateToken(user._id);
            
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });

            // Redirect back to frontend with user info (or just let the cookie handle it)
            res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
        } catch (error) {
            logger.error(`Error in Google Auth callback: ${error.message}`, { stack: error.stack });
            res.redirect(`${process.env.CLIENT_URL}/login?error=google-auth-failed`);
        }
    }
);

const generateToken = require("../middleware/generateToken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Get current user profile
router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ user });
    } catch (error) {
        logger.error(`Error in /me: ${error.message}`, { stack: error.stack });
        res.status(500).send({ message: "Error fetching user profile" });
    }
});

// Login user endpoint
router.post("/login", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // First, find if a user with this email actually exists in the DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(401).send({ message: "Please verify your email to login" });
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
router.post("/logout", (req, res, next) => {
  // Clear passport session if it exists
  if (req.logout) {
    req.logout((err) => {
      if (err) return next(err);
    });
  }

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
