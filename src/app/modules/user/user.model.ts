import { model, Schema } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const UserSchema = new Schema<TUser, TUserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
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

UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await UserModel.findOne({ id }).select('+password');
};

UserSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp: Date, jwtIssuedTimestamp: number) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};

export const UserModel = model<TUser, TUserModel>('User', UserSchema)