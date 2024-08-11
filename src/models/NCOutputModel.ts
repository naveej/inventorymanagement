import mongoose, { Schema, Document } from "mongoose";
import { MetadataSchema } from "./SkillMatrixModel";

// Define an interface representing a document in MongoDB.
interface INCOutput extends Document {
  metadata: typeof MetadataSchema;
  date: Date;
  ncDetails: string;
  reason: string;
  actionTaken: string;
  responsibility: string;
  ncApprovedBy: string;
  targetDate: Date;
  status: string;
  comments: string;
  lastUpdated: Date;
}

// Create a Schema corresponding to the document interface.
const NCOutputSchema = new Schema<INCOutput>({
  metadata: {
    type: MetadataSchema,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ncDetails: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  actionTaken: {
    type: String,
    required: true,
  },
  responsibility: {
    type: String,
    required: true,
  },
  ncApprovedBy: {
    type: String,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});
NCOutputSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

const NCOutput =
  mongoose.models.NCOutput ||
  mongoose.model<INCOutput>("NCOutput", NCOutputSchema);
export default NCOutput;
