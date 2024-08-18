import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
    min: 3,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    min: 6,
  },
  registerNo: {
    type: String,
  },
  role: {
    type: String,
  },
  deptName: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = models?.User || model("User", UserSchema);

export default UserModel;
