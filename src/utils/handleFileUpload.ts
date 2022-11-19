import fs from 'fs';

const handleFileUpload = (file: any, generatedFileName: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + `/../../lib/uploads/${generatedFileName}.png`, file, err => {
        if (err) {
        reject(err);
        }
        resolve({ message: 'Upload successfully!' });
    });
  });
};

export default handleFileUpload;