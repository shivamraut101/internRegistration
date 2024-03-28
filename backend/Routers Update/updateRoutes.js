// Import Express and Intern model
const express = require("express");
const router = express.Router();
const Intern = require("../internSchema");

// Route handler for updating personal info
// router.put("/personal-info/:email", async (req, res) => {
//   try {
//     const email = req.params.email;

//     // Find the intern document based on the email
//     const intern = await Intern.findOne({ 'personalInfo.email': email });

//     if (!intern) {
//       return res.status(404).json({ message: "Intern not found" });
//     }

//     // Update personal info fields
//     intern.personalInfo = {
//       name: req.body.name,
//       email: req.body.email,
//       dob: req.body.dob,
//       fatherName: req.body.fatherName,
//       motherName: req.body.motherName,
//       whatsappNumber: req.body.whatsappNumber,
//       address: req.body.address,
//       city: req.body.city,
//       pincode: req.body.pincode,
//       state: req.body.state,
//       country: req.body.country,
//     };

//     // Save the updated document back to the database
//     await intern.save();

//     res.status(200).json({ success: true, update: "Personal info updated successfully" });
//     console.log("Updated Successfully")
//   } catch (error) {
//     // console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//     console.log(error)
//   }
// });


router.put("/personal-info/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // Construct the update object with only the fields that need to be updated
    const updateFields = {
      name: req.body.name,
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

    // Update the document in the database
    const result = await Intern.updateOne(
      { 'personalInfo.email': email },
      { $set: { 'personalInfo.name': updateFields.name, 
                 'personalInfo.dob': updateFields.dob,
                 'personalInfo.fatherName': updateFields.fatherName,
                 'personalInfo.motherName': updateFields.motherName,
                 'personalInfo.whatsappNumber': updateFields.whatsappNumber,
                 'personalInfo.address': updateFields.address,
                 'personalInfo.city': updateFields.city,
                 'personalInfo.pincode': updateFields.pincode,
                 'personalInfo.state': updateFields.state,
                 'personalInfo.country': updateFields.country } }
    );
    
    if (result.nModified === 0) {
      return res.status(404).json({ message: "Intern not found or no changes were made" });
    }

    res.status(200).json({ success: true, update: "Personal info updated successfully" });
  } catch (error) {
    console.error("Error updating personal info:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Add more update routes for other types of data (educational background, govt ids, etc.)

module.exports = router;
