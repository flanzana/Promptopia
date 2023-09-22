import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    // TODO allow extended latin letters, had problems with Ž
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Zž0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

// models because of nextjs, model if normal
const User = models.User || model("User", UserSchema);

export default User;