"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Book Schema
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isBookOfTheMonth: { type: Boolean, required: false },
    reviews: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Review", required: false },
    ],
    clubs: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Club", required: false },
    ],
});
exports.Book = mongoose_1.default.model("Book", bookSchema);
