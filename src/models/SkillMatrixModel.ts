import mongoose, { Schema, Document } from "mongoose";

export interface Metadata {
  docNo: string;
  version: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  departmentName: string;
}

export interface SkillMatrixDocument extends Document {
  metadata: Metadata;
  name: string;
  skills: string[];
  lastUpdated: Date;
}

export const MetadataSchema = new Schema<Metadata>({
  docNo: { type: String, required: true },
  version: { type: String, required: true },
  preparedBy: { type: String, required: true },
  reviewedBy: { type: String, required: true },
  approvedBy: { type: String, required: true },
  departmentName: { type: String, required: true },
});

const SkillMatrixSchema = new Schema<SkillMatrixDocument>({
  metadata: { type: MetadataSchema, required: true },
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const SkillMatrixModel =
  mongoose.models.SkillMatrix ||
  mongoose.model<SkillMatrixDocument>("SkillMatrix", SkillMatrixSchema);

export default SkillMatrixModel;
