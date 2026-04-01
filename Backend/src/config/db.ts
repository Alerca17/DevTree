import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')

    } catch (error) {

        console.error(colors.red('Error connecting to MongoDB:'), error.message)
        process.exit(1)
    }
}