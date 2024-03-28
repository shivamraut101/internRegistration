const B2 = require("backblaze-b2");

// Function to authorize B2 and return the B2 client instance
const authorizeB2 = async () => {
  try {
    const b2 = new B2({
      accountId: "b992bf60fc85",
      applicationKey: "005d472f3374a1976fb9b9b4cc255e3c7b3d367cfe",
    });
    await b2.authorize();
    console.log("Auth back blaze b2 successfull");
    return b2;
  } catch (error) {
    console.error("Authorization failed:", error);
    throw new Error("Failed to authorize B2");
  }
};

// Function to get upload URL and upload authorization token
const getUploadURL = async (b2) => {
  try {
    const {
      data: { uploadUrl, authorizationToken },
    } = await b2.getUploadUrl({ bucketId: "3b79a9320b9f86008fec0815" });
    console.log("Upload URL:", uploadUrl);
    console.log("Upload Authorization Token:", authorizationToken);
    return { uploadUrl, authorizationToken };
  } catch (error) {
    console.error("Failed to get upload URL:", error);
    throw new Error("Failed to get upload URL");
  }
};

module.exports = { authorizeB2, getUploadURL };
