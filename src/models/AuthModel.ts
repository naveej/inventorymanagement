import { UserRole } from "@/app/_types/userRole";
import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  departmentName: string | undefined;
  refreshToken: string | null;
}

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(UserRole)
  },
  departmentName: {
    type: String,
    required: function () {
      return this.role === UserRole.Department;
    },
  },
  refreshToken: {
    type: String,
    default: null
  },
});
UserSchema.pre("save", function (next) {
  next();
});

const AuthUser =
  mongoose.models.AuthUser || mongoose.model<IUser>("users", UserSchema);
export default AuthUser;
