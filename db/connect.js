const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.DATABASE) {
      throw new Error('DATABASE environment variable is not defined.');
    }

    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD,
    );

    await mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(console.log('DB connection is successful'));

    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

module.exports = connectDB;
