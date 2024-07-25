import { Schema, model, models } from "mongoose";

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
    default: Date.now,
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
