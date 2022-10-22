import * as dotenv from 'dotenv'
import { connect } from "mongoose";

dotenv.config({ path: __dirname+'/../.env' })

const mongoURL: String | undefined = process.env.MONGO_URL

console.log(mongoURL)

export const connectToDatabase = async () => {
    await connect(`${mongoURL}`)
}