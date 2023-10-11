import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email already registerd!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "username is required!"],
  },
  image: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
