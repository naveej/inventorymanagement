import mongoose, { Schema, Document } from "mongoose";
import { MetadataSchema } from "./SkillMatrixModel";

// Define an interface representing a document in MongoDB.
interface ICalibrationSchedule extends Document {
  metadata: typeof MetadataSchema;
  instrumentName: string;
  instrumentNo: string;
  frequencyOfCalibration: string;
  typeOfInstrument: string;
  lastDoneAt: Date;
  refNo: string;
  nextDueOn: Date;
  comments: string;
  lastUpdated: Date;
}

// Create a Schema corresponding to the document interface.
const CalibrationScheduleSchema = new Schema<ICalibrationSchedule>({
  metadata: {
    type: MetadataSchema,
    required: true,
  },
  instrumentName: {
    type: String,
    required: true,
  },
  instrumentNo: {
    type: String,
    required: true,
  },
  frequencyOfCalibration: {
    type: String,
    required: true,
  },
  typeOfInstrument: {
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

CalibrationScheduleSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

const CalibrationSchedule =
  mongoose.models.CalibrationSchedule ||
  mongoose.model<ICalibrationSchedule>(
    "CalibrationSchedule",
    CalibrationScheduleSchema
  );

export default CalibrationSchedule;
