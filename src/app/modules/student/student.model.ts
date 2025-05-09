import { model, Schema } from "mongoose";
import { TStudent, TStudentGuardian, TStudentLocalGuardian, TStudentMethods, TStudentName } from "./student.interface";

const userNameSchema = new Schema<TStudentName>({
    firstName: {
        type: String,
        minlength: [1, "First name should be at least 1 character long"],
        maxlength: [10, "First name should be less than 10 characters long"],
        required: [true, "First name is required"],
        trim: true, // Removes whitespace from both ends
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        minlength: [1, "Last name should be at least 1 character long"],
        maxlength: [10, "Last name should be less than 10 characters long"],
        required: [true, "Last name is required"],
        trim: true,
    },
}, {
    _id: false
});

const guardianSchema = new Schema<TStudentGuardian>({
    fatherName: {
        type: String,
        required: [true, "Father's name is required"],
        trim: true,
    },
    fatherOccupation: {
        type: String,
        required: [true, "Father's occupation is required"],
        trim: true,
    },
    fatherContactNo: {
        type: String,
        required: [true, "Father's contact number is required"],
        trim: true,
    },
    motherName: {
        type: String,
        required: [true, "Mother's name is required"],
        trim: true,
    },
    motherOccupation: {
        type: String,
        required: [true, "Mother's occupation is required"],
        trim: true,
    },
    motherContactNo: {
        type: String,
        required: [true, "Mother's contact number is required"],
        trim: true,
    },
}, {
    _id: false
});

const localGuardianSchema = new Schema<TStudentLocalGuardian>({
    name: {
        type: String,
        required: [true, "Local guardian's name is required"],
        trim: true,
    },
    occupation: {
        type: String,
        required: [true, "Local guardian's occupation is required"],
        trim: true,
    },
    contactNo: {
        type: String,
        required: [true, "Local guardian's contact number is required"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Local guardian's address is required"],
        trim: true,
    },
}, {
    _id: false
});

const studentSchema = new Schema<TStudent, TStudentMethods>({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: [true, 'ID must be unique'],
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: [true, 'User id must be unique'],
        ref: 'User'
    },
    name: {
        type: userNameSchema,
        required: [true, "Name is required"]
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: "{VALUE} is not a valid gender",
        },
        required: [true, "Gender is required"],
    },
    dateOfBirth: {
        type: String,
        required: [true, "Date of birth is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, 'email must be unique'],
        trim: true,
        lowercase: true, // Converts email to lowercase
    },
    contactNo: {
        type: String,
        required: [true, "Contact number is required"],
        trim: true,
    },
    emergencyContactNo: {
        type: String,
        required: [true, "Emergency contact number is required"],
        trim: true,
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: "{VALUE} is not a valid blood group",
        },
        required: [true, "Blood group is required"],
    },
    presentAddress: {
        type: String,
        required: [true, "Present address is required"],
        trim: true,
    },
    permanentAddress: {
        type: String,
        required: [true, "Permanent address is required"],
        trim: true,
    },
    guardian: {
        type: guardianSchema,
        required: [true, "Guardian information is required"],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, "Local guardian information is required"],
    },
    profileImg: {
        type: String,
        default: "",
        trim: true,
    },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'Academic-Semester'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'Academic-Department',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

// virtual
studentSchema.virtual('fullName').get(function () {
    return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

// Query Middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

//creating a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
    const existingUser = await StudentModel.findOne({ id });
    return existingUser;
};

export const StudentModel = model<TStudent, TStudentMethods>('Student', studentSchema);


// Pre Save Document Middleware for create student
// studentSchema.pre('save', async function (next) {
//     this.password = await bcrypt.hash(this.password, Number(config.BCRIPT_SALT))
//     next()
// })
// after Save Document Middleware for create student
// studentSchema.post('save', async function (doc, next) {
//     doc.password = "404"
//     next()
// })

// query Middleware for Get ALL User
// studentSchema.pre('find', async function (next) {
//     this.find({ isDeleted: { $ne: true } })
//     next()
// })
// query Middleware for Get Single User
// studentSchema.pre('findOne', async function (next) {
//     this.find({ isDeleted: { $ne: true } })
//     next()
// })

// Aggregate Middleware for Get Single User
// studentSchema.pre('aggregate', async function (next) {
//     this.pipeline().unshift({
//         $match: {
//             isDeleted: {
//                 $ne: true
//             }
//         }
//     })
//     next()
// })

// studentSchema.pre('findOneAndUpdate', async function (next) {
//     this.setQuery({ ...this.getQuery(), isDeleted: { $ne: true } });
//     next()
// })

// Mongoose Virtual
// studentSchema.virtual('fullname').get(function () {
//     const {
//         firstName,
//         lastName
//     } = this.name
//     return `${firstName} ${lastName}`
// })
/**
 *
 *
 *
 *
 *
 */

// For Creating Static Methods
// studentSchema.statics.isUserExist = async function (id: string) {
//     const existingStudent = await StudentModel.findOne({ id })
//     return existingStudent
// }
// export const StudentModel = model<TStudent, TStudentMethods>('Student', studentSchema);

// For Creating Instance Methods
// const studentSchema = new Schema<TStudent, StudentModelExtend, TStudentMethods>({})
// studentSchema.methods.isUserExist = async function (id: string) {
//     const existingStudent = await StudentModel.findOne({ id })
//     return existingStudent
// }
// export const StudentModel = model<TStudent, StudentModelExtend>('Student', studentSchema);