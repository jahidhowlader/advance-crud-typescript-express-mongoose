import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const UserSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admins']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.BCRIPT_SALT))
    next()
})
// after Save Document Middleware for create student
UserSchema.post('save', async function (doc, next) {
    doc.password = "404"
    next()
})

export const UserModel = model<TUser>('User', UserSchema)