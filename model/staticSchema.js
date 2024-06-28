import mongoose from "mongoose";

const staticSchema = new mongoose.Schema({
  static: [
    {
      type: {
        type: String,
        enum: ["Terms & Conditions", "Privacy Policy", "About Us"],
      },
      heading: String,
      content: String,
    },
  ],
  faq: [{ ques: String, sol: String }],
});

export const Static = mongoose.model("static", staticSchema);

export const defaultStatic = async () => {
  const staticData = await Static.find();
  if (staticData.length === 0) {
    await Static.create({
      static: [
        {
          type: "About Us",
          heading: "About Us 1",
          content: "Content for About Us 1",
        },
        {
          type: "Privacy Policy",
          heading: "Privacy Policy 1",
          content: "Content for Privacy Policy 1",
        },
        {
          type: "Terms & Conditions",
          heading: "Terms and Conditions 1",
          content: "Content for Terms and Conditions 1",
        },
      ],
      faq: [
        {
          ques: "Faq 1",
          sol: "Solution for Faq 1",
        },
        {
          ques: "Faq 2",
          sol: "Solution for Faq 2",
        },
        {
          ques: "Faq 3",
          sol: "Solution for Faq 3",
        },
      ],
    });
    return console.log("Static data created successfully");
  }
  // return console.log("Static data already created");
};
