const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'please provide the comopany name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'please provide a position'],
      maxlength: 100,
    },
    stutus: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide user'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Job', JobSchema);
