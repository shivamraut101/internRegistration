const express = require("express");
const router = express.Router();
const Intern = require("../internSchema");
const { body, validationResult } = require("express-validator");


// Route handler to fetch user information based on email
router.get("/user-info/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const intern = await Intern.findOne({ 'personalInfo.email': email });
  
      // If user data exists, send it in the response
      if (intern) {
        res.json(intern.personalInfo);
        console.log(intern.personalInfo)
      } else {
        res.status(404).json({ message: "User not found " });
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  module.exports = router;