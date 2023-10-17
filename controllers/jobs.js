const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

exports.getJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if (!job) {
    throw new NotFoundError('please login first or provide an existing job');
  }
  res.status(StatusCodes.OK).json({ job });
};

exports.createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

exports.updateJob = async (req, res) => {
  const {
    body: { company, position },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('please fill all fields');
  }

  const job = await Job.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user.userId,
    },
    req.body,
    { new: true, runValidators: true },
  );

  if (!job) {
    throw new NotFoundError('No company job matches the given data');
  }

  res.status(StatusCodes.OK).json({ job });
};

exports.deleteJob = async (req, res) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!job) {
    throw new NotFoundError('No company job matches the given data');
  }
  res.status(StatusCodes.OK).send('Job deleted');
};
