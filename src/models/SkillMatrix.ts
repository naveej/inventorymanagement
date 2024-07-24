import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const FormMetaData = new Schema({
  docNo: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  version: {
    type: String,
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
    default: Date.now,
  },
  departmentName: {
    type: String,
    required: true,
  },
});

const SkillMatrixSchema = new Schema({
  metadata: FormMetaData,
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // Define skills as an array of strings
  },
});

const SkillMatrixModel = models.Skill || model("Skill", SkillMatrixSchema);

export default SkillMatrixModel;
