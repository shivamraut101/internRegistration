const express = require("express");
const router = express.Router();
const Intern = require("../internSchema");
const {authorizeB2} = require('../b2Auth')
const axios = require('axios');
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
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

router.get("/get-image/:fileName", async (req, res) => {
  try {
      const b2 = await authorizeB2(); // Authorize B2 and get the B2 client instance
      const fileName = req.params.fileName;

      // Get temporary URL for the image
      const response = await b2.downloadFileByName({
          bucketName: 'basketHuntInternData',
          fileName: fileName,
          responseType: 'arraybuffer', // options are as in axios: 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      });

      // Extract headers from the response
      const headers = response.config.headers;

      // Make a GET request to the URL received
      const imageDataResponse = await axios.get(response.config.url, {
          responseType: 'arraybuffer', // Ensure the response type is correct
          headers: headers // Pass the extracted headers
      });

      // Set the headers obtained from the response
      res.set(imageDataResponse.headers);

      // Send the image data in the response
      res.send(imageDataResponse.data);
  } catch (error) {
      console.log("Error :: get-image ::", error);
      res.status(500).json({ success: false, message: "Error fetching image" });
  }
});

  module.exports = router;