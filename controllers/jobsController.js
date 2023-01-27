
import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import UnauthenticatedError from '../errors/UnauthenticatedError.js'
import Job from '../models/jobModel.js'
import checkPermission from '../utils/checkPermission.js'

const getAllJob = async (req, res) => {
    const jobs = await Job.find({ })
    res.status(200).json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}

const createJob = async (req, res) => {

    const { position, company } = req.body
    console.log(req.body)
    if (!position || !company) {
        throw new BadRequestError('Position and Company are required')
    }
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(201).json({ job })
}
const updateJob = async (req, res) => {
    const { id } = req.params

    const { company, position } = req.body
    if (!position || !company) {
        throw new BadRequestError('Please provide all values')
    }
    const job = await Job.findOne({ _id: id })
    if (!job) {
        throw new NotFoundError('No job with id')
    }
    checkPermission(req.user, job.createdBy)
    const updatedJob = await Job.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ updatedJob })
}
const deleteJob = async (req, res) => {
    const { id } = req.params

    const job = await Job.findOne({ _id: id })
    if (!job) {
        throw new NotFoundError('No job with id')
    }
    checkPermission(req.user, job.createdBy)
    await job.remove()
    res.status(200).json({ msg: 'Success! job removed' })
}
const showStats = (req, res) => {
    res.send('Job Status')
}
export { getAllJob, createJob, updateJob, deleteJob, showStats }
