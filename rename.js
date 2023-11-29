const fs = require('fs');
const path = require('path');

const directoryPath = './downloads'; // Specify the path to the directory where the file is located
const filePattern = /^Basic.*$/; // Specify the pattern to match the file

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const matchingFiles = files.filter(file => filePattern.test(file));

    if (matchingFiles.length === 0) {
        console.log('No matching files found.');
        return;
    }

    const oldFileName = matchingFiles[0]; // Assumes there's only one matching file
    const newFileName = 'indata.csv';

    const oldFilePath = path.join(directoryPath, oldFileName);
    const newFilePath = path.join(directoryPath, newFileName);

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
        } else {
            console.log(`File "${oldFileName}" renamed to "${newFileName}".`);
        }
    });
});