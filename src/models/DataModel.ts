import mongoose, { Schema, Document } from "mongoose";

interface IData extends Document {
  name: string;
  age: string;
  city: string;
}

const DataSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  city: { type: String, required: true },
});

export const DataModel = mongoose.model<IData>("Data", DataSchema);
