const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

// Read the json file.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8'),
);

// import data into db.
const importDate = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully imported.');
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

// Deleting the previous data.
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully.');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importDate();
}

if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
