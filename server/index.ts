import express from 'express'
import mongoose from'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from'express-fileupload'
import router from'./src/route/index'
import errorHandler from'./src/middleware/ErrorHandlingMiddleware'
import path from'path'

dotenv.config({path:`.${process.env.NODE_ENV}.env`});
const PORT = process.env.PORT || 5003

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Error handler
app.use(errorHandler)

const start = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()