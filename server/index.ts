import express from 'express'
import sequelizeConnection from'./src/db'
import cors from 'cors'
import fileUpload from'express-fileupload'
import router from'./src/routes/index'
import errorHandler from'./src/middleware/ErrorHandlingMiddleware'
import path from'path'

const PORT = process.env.PORT || 5003

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Error handler
app.use(errorHandler)

const start = async () => {
    try {
        await sequelizeConnection.authenticate()
        await sequelizeConnection.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()