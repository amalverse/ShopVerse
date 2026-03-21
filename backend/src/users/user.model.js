const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  profileImage: { type: String },
  bio: { type: String, maxlength: 200 },
  profession: { type: String },
  address: { type: Object },
  createdAt: { type: Date, default: Date.now },
});

// Hashing passwords
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Password comparison(Match passwords from DB and from client)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Delete user's products when user is deleted
userSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const Product = require('../products/products.model');
    await Product.deleteMany({ author: doc._id });
  }
});

const User = new model("User", userSchema);
module.exports = User;

// Model is a class that represents a collection of documents in a MongoDB database. User is a class that represents a collection of documents in a MongoDB database.
// userSchema is a class that represents a collection of documents in a MongoDB database.
