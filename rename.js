const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const directoryPath = './downloads';
const filePattern = /^Basic.*$/;
const newFileName = 'indata.csv';

// Function to rename the file
function renameFile(oldFileName) {
    const oldFilePath = path.join(directoryPath, oldFileName);
    const newFilePath = path.join(directoryPath, newFileName);

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
        } else {
            console.log(`File "${oldFileName}" renamed to "${newFileName}".`);
        }
    });
}

// Watch for changes in the directory using chokidar
const watcher = chokidar.watch(directoryPath, { ignoreInitial: true });

watcher.on('add', (filePath) => {
    const filename = path.basename(filePath);

    if (filePattern.test(filename)) {
        console.log(`New matching file detected: ${filename}`);
        renameFile(filename);
    }
});

console.log('Watching for changes in the "downloads" folder...');
