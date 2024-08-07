import mongoose, { Schema, Document } from "mongoose";
import { MetadataSchema } from "./SkillMatrixModel";

// Define an interface representing a document in MongoDB.
interface IAssetMaintenance extends Document {
  metadata: typeof MetadataSchema;
  assetName: string;
  assetNo: string;
  frequencyOfMaintenance: string;
  typeOfAsset: string;
  lastDoneAt: Date;
  refNo: string;
  nextDueOn: Date;
  comments: string;
  lastUpdated: Date;
}

// Create a Schema corresponding to the document interface.
const AssetMaintenanceSchema = new Schema<IAssetMaintenance>({
  metadata: {
    type: MetadataSchema,
    required: true,
  },
  assetName: {
    type: String,
    required: true,
  },
  assetNo: {
    type: String,
    required: true,
  },
  frequencyOfMaintenance: {
    type: String,
    required: true,
  },
  typeOfAsset: {
    type: String,
    required: true,
  },
  lastDoneAt: {
    type: Date,
    required: true,
  },
  refNo: {
    type: String,
    required: true,
  },
  nextDueOn: {
    type: Date,
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
AssetMaintenanceSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

const AssetMaintenance =
  mongoose.models.AssetMaintenance ||
  mongoose.model<IAssetMaintenance>("AssetMaintenance", AssetMaintenanceSchema);
export default AssetMaintenance;
