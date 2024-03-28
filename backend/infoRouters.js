// Import Express and Intern model
const express = require("express");
const router = express.Router();
const Intern = require("./internSchema");
const multer = require("multer");
const { authorizeB2, getUploadURL } = require("./b2Auth");
const generateUniqueFileName = require("./utils");
const { body, validationResult } = require("express-validator");

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route handler for personal info form submission
router.post(
  "/personal-info",
  upload.single("passportSizePhoto"),
  async (req, res) => {
    try {
      const b2 = await authorizeB2(); // Authorize B2 and get the B2 client instance
      const { uploadUrl, authorizationToken } = await getUploadURL(b2); // Get upload URL and authorization token
      if (!b2) {
        throw new Error("Failed to authorize B2");
      }
      const uniqueFileName = generateUniqueFileName(req.file.originalname);

      // Upload file to Backblaze B2
      const uploadResult = await b2.uploadFile({
        uploadUrl: uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: uniqueFileName,
        data: req.file.buffer,
        bucketId: "3b79a9320b9f86008fec0815",
      });

      // Create an instance of Intern model
      const intern = new Intern();
      console.log("DB :: Unique file name ::",uniqueFileName)

      // Populate personal info fields
      intern.personalInfo = {
        name: req.body.name,
        email: req.body.email,
        passportSizePhoto: uploadResult.fileName || uniqueFileName, // Store the file name from B2
        dob: req.body.dob,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        whatsappNumber: req.body.whatsappNumber,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        state: req.body.state,
        country: req.body.country,
      };

      // Save personal info
      await intern.save().then(() => {
        console.log("Intern registration saved successfully");

        // Update intern registration
        // intern.personalInfo.name = "test history iteration";
        // intern.save().then(() => {
        //   console.log("Intern registration updated successfully");

        //   // View version history
        //   Intern.findOne({ _id: intern.personalInfo._id }).then((history) => {
        //     console.log("Version History:");
        //     console.log(history);
        //   });
        // });
      });

      // res.status(201).json({ message: "Personal info submitted successfully" });
      res.json({ success: true });
      console.log("Data Entry Success");
    } catch (error) {
      // res.status(500).json({ message: "Internal server error" });
      // res.json({ success: false });
      // console.log(error);
      if (error.code === 11000) {
        // Duplicate key error, email already registered
        return res.status(400).json({ message: "Email is already registered" });
      }
      // Handle other errors
      console.error(error);
      res.status(500).json({ success: false });
    }
  }
);

// Route handler for educational background form submission
router.post("/educational-background", async (req, res) => {
  try {
    // Find the intern document based on the email
    const intern = await Intern.findOne({
      "personalInfo.email": req.body.email,
    });

    if (!intern) {
      return res.json({ internEmail: false });
    }

    // Send initial response with internEmail true
    res.json({ internEmail: true });

    // Update the educational background subdocument
    intern.educationalBackground = {
      class_10th_marks: req.body.class_10th_marks,
      board_10th_name: req.body.board_10th_name,
      class_12th_marks: req.body.class_12th_marks,
      board_12th_name: req.body.board_12th_name,
      university_college_name: req.body.university_college_name,
      degree: req.body.degree,
      currentYear_or_sem: req.body.currentYear_or_sem,
      expected_graduation_date: req.body.expected_graduation_date,
      portfolio_link: req.body.portfolio_link,
    };

    // Save the updated document back to the database
    await intern.save();

    // Send success response
    res.json({ success: true });

    // res.status(201).json({ success: true });
    console.log("Data saved");
  } catch (error) {
    res.status(500).json({ internEmail: false, success: false });
    // res.status(500).json({ internEmail: false, success: false });
    // res.json({ success: false });
    console.log(error);
  }
});

// Route handler for certificates form submission
router.post("/certificates", async (req, res) => {
  try {
    const certificates = req.body.certificates.map(
      (cert) =>
        new Intern.CertificateSchema({
          certificateName: cert.certificateName,
          issuingAuthority: cert.issuingAuthority,
        })
    );

    // Save certificates
    await Intern.CertificateSchema.insertMany(certificates);

    res.status(201).json({ message: "Certificates submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route handler for Govt Ids form submission
router.post("/govt-id", async (req, res) => {
  try {
    // Find the intern document based on the email
    const intern = await Intern.findOne({
      "personalInfo.email": req.body.email,
    });

    if (!intern) {
      return res.json({ internEmail: false });
    }

    // Send initial response with internEmail true
    res.json({ internEmail: true });

    // Update govtIds and save the document
    intern.govtIds = {
      aadharNumber: req.body.aadharNumber,
      panNumber: req.body.panNumber,
    };

    // Save the updated document back to the database
    await intern.save();

    // Send success response
    res.status(201).json({ success: true });
    // res.json({ success: true });
    console.log("data saved");
  } catch (error) {
    // Handle errors
    if (error.code === 11000) {
      // Duplicate key error, email already registered
      return res.status(400).json({ message: "Data Already filled" });
    }
    // Handle other errors
    console.error(error);
    res.status(500).json({ internEmail: false, success: false });
    // res.json({ internEmail: false, success: false });
  }
});

module.exports = router;
