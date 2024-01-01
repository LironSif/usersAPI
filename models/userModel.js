import fs from 'fs'
import { filePath } from '../utils/userFilePath.js'


// Function to initialize the movies file if it doesn't exist
const initializeUsersFile = () => {
  if (!fs.existsSync(filePath)) {
    // If the file doesn't exist, create it with an empty array or default content
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
    console.log("created file");
  }
};

const readUsersFromFile = () => {
  try {
    initializeUsersFile(); // Ensure the file exists before reading
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    throw new Error('Error reading from file');
  }
};

const writeUsersToFile = (users) => {
  try {
    initializeUsersFile(); // Ensure the file exists before writing
    fs.writeFileSync(filePath, JSON.stringify(users), 'utf8');
  } catch (error) {
    throw new Error('Error writing to filse');
  }
};
 export {writeUsersToFile, readUsersFromFile}