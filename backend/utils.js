const crypto = require('crypto');

// Function to generate a unique file name
const generateUniqueFileName = (originalFileName) => {
  // Generate a random hash using the original file name and current timestamp
  const randomHash = crypto.createHash('sha1').update(originalFileName + Date.now()).digest('hex');
  // Extract the file extension from the original file name
  const fileExtension = originalFileName.split('.').pop();
  // Concatenate the random hash with the file extension to form the unique file name
  const uniqueFileName = randomHash + '.' + fileExtension;
  return uniqueFileName;
};

module.exports = generateUniqueFileName;
// Example usage
// const originalFileName = 'example.jpg';
// const uniqueFileName = generateUniqueFileName(originalFileName);
// console.log('Unique file name:', uniqueFileName);
