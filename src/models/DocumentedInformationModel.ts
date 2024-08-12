import mongoose, { Schema, Document } from "mongoose";
import { MetadataSchema } from "./SkillMatrixModel";

// Define an interface representing a document in MongoDB.
interface IDocumentedInformation extends Document {
  metadata: typeof MetadataSchema;
  documentTitle: string;
  refNo: string;
  versionNo: string;
  area: string;
  typeOfDocument: string;
  effectiveDate: Date;
  responsibility: string;
  mediumOfStorage: string;
  placeOfStorage: string;
  retentionPeriod: string;
  lastUpdated: Date;
}

// Create a Schema corresponding to the document interface.
const DocumentedInformationSchema = new Schema<IDocumentedInformation>({
  metadata: {
    type: MetadataSchema,
    required: true,
  },
  documentTitle: {
    type: String,
    required: true,
  },
  refNo: {
    type: String,
    required: true,
  },
  versionNo: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  typeOfDocument: {
    type: String,
    required: true,
  },
  effectiveDate: {
    type: Date,
    required: true,
  },
  responsibility: {
    type: String,
    required: true,
  },
  mediumOfStorage: {
    type: String,
    required: true,
  },
  placeOfStorage: {
    type: String,
    required: true,
  },
  retentionPeriod: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});
DocumentedInformationSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

const DocumentedInformation =
  mongoose.models.DocumentedInformation ||
  mongoose.model<IDocumentedInformation>(
    "DocumentedInformation",
    DocumentedInformationSchema
  );
export default DocumentedInformation;
