import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }
    const fileContent = data.toString().trim();
    const lines = fileContent.split('\n');
    const students = lines.slice(1);
    const fields = {};

    for (const line of students) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const student = trimmedLine.split(',');
        if (student.length >= 4) {
          const firstname = student[0].trim();
          const field = student[3].trim();
          if (firstname && field) {
            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(firstname);
          }
        }
      }
    }
    resolve(fields);
  });
});

export default readDatabase;
export { readDatabase };
