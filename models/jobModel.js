import  mongoose, { Schema } from 'mongoose'

const jobSchema = new Schema({

    position: {
        type: String,
        required: [true, 'Please provide position '],
        maxlength: 20,
        trim: true
    },
    status: {
        type: String,
        enum: ['interview','declined','pending'],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote','internship'],
        default: 'full-time'
    }
    ,
    company: {
        type: String,
        required: true
    }
    ,
    location: {
        type: String,
        default:'myCity',
        required:true
    }
    ,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user!']
    }
},{timestamps:true})

const Job = new mongoose.model('Jobs', jobSchema)


export default Job