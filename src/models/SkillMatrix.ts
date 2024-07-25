import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const FormMetaData = new Schema({
  docNo: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
    default: 1,
  },
  preparedBy: {
    type: String,
    required: true,
  },
  reviewedBy: {
    type: String,
    required: true,
  },
  approvedBy: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: () =>
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Calcutta",
        hour12: true,
      }),
  },
  departmentName: {
    type: String,
    required: true,
  },
});

const SkillMatrixSchema = new Schema({
  metadata: FormMetaData,
  // slno: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
});

const SkillMatrixModel = models.Skill || model("Skill", SkillMatrixSchema);

export default SkillMatrixModel;
