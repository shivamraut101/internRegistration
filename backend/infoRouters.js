// Import Express and Intern model
const express = require("express");
const router = express.Router();
const Intern = require("./internSchema");
const { body, validationResult } = require("express-validator");

// Route handler for personal info form submission
router.post("/personal-info", async (req, res) => {
  try {
    // Create an instance of Intern model
    const intern = new Intern();

    // Populate personal info fields
    intern.personalInfo = {
      name: req.body.name,
      email: req.body.email,
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
      intern.personalInfo.name = "test history iteration";
      intern.save().then(() => {
        console.log("Intern registration updated successfully");

        // View version history
        Intern.findOne({ _id: intern.personalInfo._id }).then((history) => {
          console.log("Version History:");
          console.log(history);
        });
      });
    });

    // res.status(201).json({ message: "Personal info submitted successfully" });
    res.json({ success: true });
    console.log("Data Entry Success");
  } catch (error) {
    // res.status(500).json({ message: "Internal server error" });
    res.json({ success: false });
    console.log(error);
  }
});

// Route handler for educational background form submission
router.post("/educational-background", async (req, res) => {
  try {
    // Find the intern document based on the email
    const intern = await Intern.findOne({ 'personalInfo.email': req.body.email });

    if (!intern) {
      // return res.status(404).json({ message: "Intern not found" });
      return res.json({internEmail: false})
    }

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
      portfolio_link: req.body.portfolio_link
    };

    // Save the updated document back to the database
    await intern.save();

    // res.status(200).json({ message: "Educational background updated successfully" });
    res.json({ success: true });
  } catch (error) {
    // res.status(500).json({ message: "Internal server error" });
    res.json({ success: false });
    console.log(error)
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

// Route handler for residential details form submission
router.post("/residential-details", async (req, res) => {
  try {
    const govtIds = new Intern.GovtIdsSchema({
      address: req.body.address,
      city: req.body.city,
    });

    // Save residential details
    await govtIds.save();

    res
      .status(201)
      .json({ message: "Residential details submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
