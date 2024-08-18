import { UserRole } from "@/app/_types/userRole";
import { Schema, model, models } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  departmentName: string | undefined;
  refreshToken: string | null;
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
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
    required: true,
    type: String,
    min: 6,
  },
  role: {
    required: true,
    type: String,
  },
  departmentName: {
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
