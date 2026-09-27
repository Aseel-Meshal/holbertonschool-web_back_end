import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return;
  }
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n');
    const fields = {};

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i].trim();
      if (line) {
        const parts = line.split(',');
        if (parts.length >= 4) {
          const firstname = parts[0].trim();
          const field = parts[3].trim();

          if (field !== 'field' && firstname !== 'firstname') {
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
