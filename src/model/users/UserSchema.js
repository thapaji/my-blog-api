import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        unique: true,
        index: 1,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshJWT: {
        type: String,
        default: '',
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model('users', UserSchema)