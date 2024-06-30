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
      const data = await Static.findOne();
      if (!data.faq) {
        return res.status(404).json({ message: "No Faqs found" });
      }

      return res.status(200).json({
        message: "Get faq route",
        contactUs: faq.faq,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error in getting faq. ${error.message}` });
    }
  },

  getPrivacyPolicy: async (req, res) => {
    try {
      const privacyPolicy = await Static.findOne();
      if (!privacyPolicy) {
        return res.status(404).json({ message: "No privacy policy found" });
      }

      return res.status(200).json({
        message: "Get privacy policy route",
        privacyPolicy: privacyPolicy.privacyPolicy,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error in getting privacy policy. ${error.message}` });
    }
  },

  getTermsAndConditions: async (req, res) => {
    try {
      const termsAndConditions = await Static.findOne(
        {},
        { termsAndConditions: 1, _id: 0 }
      );
      if (!termsAndConditions) {
        return res
          .status(404)
          .json({ message: "No terms and conditions found" });
      }

      return res.status(200).json({
        message: "Get terms and conditions route",
        termsAndConditions: termsAndConditions.termsAndConditions,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error in getting terms and conditions. ${error.message}`,
      });
    }
  },

  addAboutUs: async (req, res) => {
    try {
      const data = await Static.findOne();

      if (!data.aboutUs) {
        return res.status(404).json({ message: "About us not found" });
      }

      data.aboutUs.push(req.body.aboutUs);

      await Static.updateOne({}, { aboutUs: data.aboutUs });

      return res
        .status(200)
        .json({ message: "New About us added", Result: data.aboutUs });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in adding about us", error });
    }
  },

  addFaq: async (req, res) => {
    try {
      const data = await Static.findOne();

      if (!data.faq) {
        return res.status(404).json({ message: "Faqs not found" });
      }

      data.faq.push(req.body.faq);

      await Static.updateOne({}, { faq: data.faq });

      return res
        .status(200)
        .json({ message: "New Faq added", Result: data.faq });
    } catch (error) {
      return res.status(500).json({ message: "Error in adding Faq", error });
    }
  },

  addPrivacyPolicy: async (req, res) => {
    try {
      const data = await Static.findOne();

      if (!data.privacyPolicy) {
        return res.status(404).json({ message: "Privacy policy not found" });
      }

      data.privacyPolicy.push(req.body.privacyPolicy);

      await Static.updateOne({}, { privacyPolicy: data.privacyPolicy });

      return res
        .status(200)
        .json({
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
    try {
      const data = await Static.findOne();

      if (!data.termsAndConditions) {
        return res
          .status(404)
          .json({ message: "Terms and conditions not found" });
      }

      data.termsAndConditions.push(req.body.termsAndConditions);

      await Static.updateOne(
        {},
        { termsAndConditions: data.termsAndConditions }
      );

      return res
        .status(200)
        .json({
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
