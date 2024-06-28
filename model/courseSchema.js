import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const courseSchema = new mongoose.Schema({
  name: String,
  deptId: {
    type: Schema.Types.ObjectId,
    ref: "departments",
  },
}, { timestamps: true });

courseSchema.plugin(mongoosePaginate);

export const Course = mongoose.model("courses", courseSchema);
