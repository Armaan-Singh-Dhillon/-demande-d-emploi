import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/notfound.js'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import authRouter from './Routes/authRoutes.js'
import jobRouter from './Routes/jobsRoutes.js'
import 'express-async-errors'
import morgan from 'morgan'
import cors from 'cors'
import autenticateUser from './middleware/auth.js'
dotenv.config()
const app = express()


//middleware
app.use(cors())
app.use(express.json())
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
app.get('/', (req, res) => {

    res.send('Welcome')
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',autenticateUser,jobRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.CONNECTION_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error)
    }
}
start()