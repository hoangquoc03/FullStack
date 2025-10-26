import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Xoa khoang trang thua o dau va cuoi chuoi
    },
    status: {
      type: String,
      enum: ["active", "completed"],
    },
    completeAt: {
      type: Date,
      default: null, // Mac dinh la null neu chua hoan thanh
    },
  },
  {
    timestamps: true, // Tu dong them createdAt va updatedAt
  }
);

const Task = mongoose.model("Task", taskSchema); // Tao model Task tu schema
export default Task;
