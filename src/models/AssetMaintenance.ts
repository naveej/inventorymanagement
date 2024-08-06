import mongoose, { Schema, Document, Model } from "mongoose";
import { FormMetaDataSchema } from "./SkillMatrix"; // Adjust the import path as necessary

// Define an interface representing a document in MongoDB.
interface IAssetMaintenance extends Document {
  metadata: typeof FormMetaDataSchema;
  assetName: string;
  assetNo: string;
  frequencyOfMaintenance: string;
  typeOfAsset: string;
  lastDoneAt: Date;
  refNo: string;
  nextDueOn: Date;
  comments: string;
}

// Create a Schema corresponding to the document interface.
const AssetMaintenanceSchema = new Schema<IAssetMaintenance>({
  metadata: {
    type: FormMetaDataSchema,
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
});

const AssetMaintenance: Model<IAssetMaintenance> =
  mongoose.models.AssetMaintenance ||
  mongoose.model<IAssetMaintenance>("AssetMaintenance", AssetMaintenanceSchema);
export default AssetMaintenance;
