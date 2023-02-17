import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({path:`.${process.env.NODE_ENV}.env`});

const sequelizeConnection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT)
    }
)

export default sequelizeConnection