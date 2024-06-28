import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const departmentSchema = new mongoose.Schema({
  name: String,
  courseId: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
}, { timestamps: true });

departmentSchema.plugin(mongoosePaginate);

export const Department = mongoose.model("departments", departmentSchema);
