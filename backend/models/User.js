const mongoose = require("mongoose");
const bycript = require("bcryptjs");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, uniqe: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

//hash passwords before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bycript.hash(this.password, 10);
  next();
});

//compare passwords

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bycript.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
