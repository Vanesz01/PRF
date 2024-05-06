import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  isBookOfTheMonth?: boolean;
  reviews?: Array<Types.ObjectId>;
  clubs?: Array<Types.ObjectId>;
}

// Book Schema
const bookSchema: Schema<IBook> = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isBookOfTheMonth: { type: Boolean, required: false },
  reviews: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Review", required: false },
  ],
  clubs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: false },
  ],
});

export const Book: Model<IBook> = mongoose.model("Book", bookSchema);
