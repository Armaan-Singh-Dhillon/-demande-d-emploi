import {readFile} from 'fs/promises'


import Job from './models/jobModel.js'
import mongoose from 'mongoose'
const start =async () =>{
    try {
        
        await mongoose.connect('mongodb+srv://Armaan:EChTYCnpKnnxDAA1@cluster0.mejam99.mongodb.net/?retryWrites=true&w=majority')
        const jsonProducts = JSON.parse(await readFile(new URL(`mock-data.json`,import.meta.url)))
        await Job.create(jsonProducts)
        console.log('Success');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}

start()