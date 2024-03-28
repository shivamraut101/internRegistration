const B2 = require('backblaze-b2')

// Function to authorize B2 and return the B2 client instance
const authorizeB2 = async () => {
  try {
    const b2 = new B2({
      accountId: 'b992bf60fc85',
      applicationKey: '005d472f3374a1976fb9b9b4cc255e3c7b3d367cfe'
    });
    await b2.authorize();
    console.log("Auth back blaze b2 successfull")
    return b2;
  } catch (error) {
    console.error('Authorization failed:', error);
    throw new Error("Failed to authorize B2");
  }
};

module.exports = authorizeB2;
