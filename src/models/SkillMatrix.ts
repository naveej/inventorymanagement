import mongoose, { Schema, Document, Model } from "mongoose";
//import AutoIncrementFactory from "mongoose-sequence";

// const connection = mongoose.connection;
// const AutoIncrement = AutoIncrementFactory(connection);

interface IFormMetaData {
  docNo: string;
  version: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  lastUpdated: Date;
  departmentName: string;
}

interface ISkillMatrix extends Document {
  metadata: IFormMetaData;
  name: string;
  skills: string[];
}

export const FormMetaDataSchema = new Schema<IFormMetaData>({
  docNo: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
    default: "1",
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

const SkillMatrixSchema = new Schema<ISkillMatrix>({
  metadata: {
    type: FormMetaDataSchema,
    required: true,
  },
  // slno: {
  //   type: Number,
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

// Apply the auto-increment plugin to the schema
//SkillMatrixSchema.plugin(AutoIncrement, { inc_field: "slno" });

// Check if the model already exists before defining it
const SkillMatrixModel: Model<ISkillMatrix> =
  mongoose.models.SkillMatrix ||
  mongoose.model<ISkillMatrix>("SkillMatrix", SkillMatrixSchema);

export default SkillMatrixModel;
