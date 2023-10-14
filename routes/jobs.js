const express = require('express');
const jobs = require('../controllers/jobs');

const router = express.Router();
router.route('/').post(jobs.createJob).get(jobs.getAllJobs);

router
  .route('/:id')
  .get(jobs.getJob)
  .patch(jobs.updateJob)
  .delete(jobs.deleteJob);

module.exports = router;
