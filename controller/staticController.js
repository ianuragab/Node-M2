import { Static } from "../model/staticSchema.js";

export const staticController = {
  getAboutUs: async (req, res) => {
    try {
      const data = await Static.findOne({
        static: { $elemMatch: { type: "About Us" } },
      });
      if (!data) {
        return res.status(404).json({ message: "No about us found" });
      }

      return res.status(200).json({
        message: "Get About us route",
        aboutUs: data,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error in getting about us. ${error.message}` });
    }
  },

  getFaqs: async (req, res) => {
    try {
      const data = await Static.findOne({ faq: { $exists: true } });
      if (!data) {
        return res.status(404).json({ message: "No Faqs found" });
      }

      return res.status(200).json({
        message: "Get faq route",
        faq: data,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error in getting faq. ${error.message}` });
    }
  },

  getPrivacyPolicy: async (req, res) => {
    try {
      const privacyPolicy = await Static.findOne({
        static: { $elemMatch: { type: "Privacy Policy" } },
      });
      if (!privacyPolicy) {
        return res.status(404).json({ message: "No privacy policy found" });
      }

      return res.status(200).json({
        message: "Get privacy policy route",
        privacyPolicy: privacyPolicy,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error in getting privacy policy. ${error.message}` });
    }
  },

  getTermsAndConditions: async (req, res) => {
    try {
      const data = await Static.findOne({
        static: { $elemMatch: { type: "Terms & Conditions" } },
      });
      if (!data) {
        return res
          .status(404)
          .json({ message: "No terms and conditions found" });
      }

      return res.status(200).json({
        message: "Get terms and conditions route",
        termsAndConditions: data,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error in getting terms and conditions. ${error.message}`,
      });
    }
  },

  addAboutUs: async (req, res) => {
    const { type, heading, content } = req.body;
    try {
      const data = await Static.findOne({
        static: { $elemMatch: { type: "About Us" } },
      });

      if (!data) {
        return res.status(404).json({ message: "About us not found" });
      }

      const result = await Static.create({}, { type, heading, content });

      return res
        .status(200)
        .json({ message: "New About us added", Result: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in adding about us", error });
    }
  },

  addFaq: async (req, res) => {
    try {
      const data = await Static.findOne({ faq: { $exists: true } });

      if (!data) {
        return res.status(404).json({ message: "Faqs not found" });
      }

      data.push(req.body.faq);

      await Static.updateOne({ faq }, { faq: data });

      return res.status(200).json({ message: "New Faq added", Result: data });
    } catch (error) {
      return res.status(500).json({ message: "Error in adding Faq", error });
    }
  },

  addPrivacyPolicy: async (req, res) => {
    const { type, heading, content } = req.body;
    try {
      const data = await Static.findOne({
        static: { $elemMatch: { type: "privacy Policy" } },
      });

      if (!data) {
        return res.status(404).json({ message: "Privacy policy not found" });
      }

      await Static.create({}, { type, heading, content });

      return res.status(200).json({
        message: "New Privacy policy added",
        Result: data.privacyPolicy,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in adding Privacy policy", error });
    }
  },

  addTermsAndConditions: async (req, res) => {
    const { type, heading, content } = req.body;
    try {
      const data = await Static.findOne({
        static: { $elemMatch: { type: "Terms & Conditions" } },
      });

      if (!data) {
        return res
          .status(404)
          .json({ message: "Terms and conditions not found" });
      }

      await Static.create({}, { type, heading, content });

      return res.status(200).json({
        message: "New Terms and conditions added",
        Result: data.termsAndConditions,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in adding Terms and conditions", error });
    }
  },
};
