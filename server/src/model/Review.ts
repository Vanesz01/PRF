import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IReview extends Document {
  book: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  comment: string;
  date: string;
}

// Review Schema
const reviewSchema: Schema<IReview> = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: String, required: true },
});

export const Review: Model<IReview> = mongoose.model("Review", reviewSchema);
