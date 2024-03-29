// intern.js
const mongoose = require("mongoose");
// const MongooseHistoryPlugin = require ('mongoose-history-plugin');
const history = require("mongoose-history-plugin");
// const { historyPlugin } = require('mongoose-history-plugin');

// Default options
let options = {
  mongoose: mongoose, // A mongoose instance
  userCollection: "users", // Colletcion to ref when you pass an user id
  userCollectionIdType: false, // Type for user collection ref id, defaults to ObjectId
  accountCollection: "accounts", // Collection to ref when you pass an account id or the item has an account property
  accountCollectionIdType: false, // Type for account collection ref id, defaults to ObjectId
  userFieldName: "user", // Name of the property for the user
  accountFieldName: "account", // Name of the property of the account if any
  timestampFieldName: "timestamp", // Name of the property of the timestamp
  methodFieldName: "method", // Name of the property of the method
  collectionIdType: false, // Cast type for _id (support for other binary types like uuid) defaults to ObjectId
  ignore: [], // List of fields to ignore when compare changes
  noDiffSave: false, // If true save event even if there are no changes
  noDiffSaveOnMethods: ["delete"], // If a method is in this list, it saves history even if there is no diff.
  noEventSave: true, // If false save only when __history property is passed
  modelName: "__histories", // Name of the collection for the histories
  embeddedDocument: false, // Is this a sub document
  embeddedModelName: "", // Name of model if used with embedded document

  // If true save only the _id of the populated fields
  // If false save the whole object of the populated fields
  // If false and a populated field property changes it triggers a new history
  // You need to populate the field after a change is made on the original document or it will not catch the differences
  ignorePopulatedFields: true,
};

const Schema = mongoose.Schema;

// Define sub-schemas for each form
const PersonalInfoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    passportSizePhoto:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures that each email is unique
    },
    dob: {
      type: Date,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const EducationalBackgroundSchema = new Schema({
  class_10th_marks: {
    type: String,
    required: true,
  },
  board_10th_name: {
    type: String,
    required: true,
  },
  class_12th_marks: {
    type: String,
    required: true,
  },
  board_12th_name: {
    type: String,
    required: true,
  },
  university_college_name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  currentYear_or_sem: {
    type: String,
    required: true,
  },
  expected_graduation_date: {
    type: Date,
    required: true,
  },
  portfolio_link: {
    type: String,
  },
});

const CertificateSchema = new Schema({
  certificateName: String,
  issuingAuthority: String,
  // Add other certificate fields as needed
});

const GovtIdsSchema = new Schema({
  aadharNumber: {
    type: String,
    required: true,
  },
  panNumber: {
    type: String,
    required: true,
  },
});

// Define the main intern schema
const internSchema = new Schema(
  {
    personalInfo: PersonalInfoSchema,
    educationalBackground: EducationalBackgroundSchema,
    certificates: [CertificateSchema],
    govtIds: GovtIdsSchema,
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

// internSchema.plugin(history(options));

const Intern = mongoose.model("Intern", internSchema);

module.exports = Intern;
