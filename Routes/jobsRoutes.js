import express from 'express'
const router = express.Router()
import { getAllJob, createJob, updateJob, deleteJob, showStats } from '../controllers/jobsController.js'

router.route('/').post(createJob).get(getAllJob)

router.route('/stats').post(showStats)

router.route('/:id').delete(deleteJob).patch(updateJob)

export default router