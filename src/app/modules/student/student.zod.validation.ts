import { Types } from 'mongoose';
import { z } from 'zod';

const phonePattern = /^\+?[1-9]\d{1,3}\d{6,14}$/; // International phone number pattern
const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

const guardianValidationSchema = z.object({
    fatherName: z.string({
        required_error: "fatherName is required",
        invalid_type_error: "fatherName must be string",
    })
        .regex(/^[a-zA-Z\s]+$/, "Father's name can only contain letters and spaces")
        .trim()
        .min(1, "Father's name is required"),
    fatherOccupation: z.string({
        required_error: "fatherOccupation is required",
        invalid_type_error: "fatherOccupation must be string",
    })
        .regex(/^[a-zA-Z\s]+$/, "Father's occupation can only contain letters and spaces")
        .trim()
        .min(1, "Father's occupation is required"),
    fatherContactNo: z.string({
        required_error: "fatherContactNo is required",
        invalid_type_error: "fatherContactNo must be string",
    })
        .regex(phonePattern, "Father's contact number must be a valid international phone number")
        .trim()
        .min(1, "Father's contact number is required"),
    motherName: z.string({
        required_error: "motherName is required",
        invalid_type_error: "motherName must be string",
    })
        .regex(/^[a-zA-Z\s]+$/, "Mother's name can only contain letters and spaces")
        .trim()
        .min(1, "Mother's name is required"),
    motherOccupation: z.string({
        required_error: "motherOccupation is required",
        invalid_type_error: "motherOccupation must be string",
    })
        .regex(/^[a-zA-Z\s]+$/, "Mother's occupation can only contain letters and spaces")
        .trim()
        .min(1, "Mother's occupation is required"),
    motherContactNo: z.string({
        required_error: "motherContactNo is required",
        invalid_type_error: "motherContactNo must be string",
    })
        .regex(phonePattern, "Mother's contact number must be a valid international phone number")
        .trim()
        .min(1, "Mother's contact number is required")
}, {
    required_error: "Guardian's Field is require"
});

const localGuardianValidationSchema = z.object({
    name: z.string({
        errorMap: () => ({ message: "Local guardian's name is required" })
    })
        .regex(/^[a-zA-Z\s]+$/, "Local guardian's name can only contain letters and spaces")
        .trim()
        .min(1, "Local guardian's name is required"),
    occupation: z.string({
        errorMap: () => ({ message: "Local guardian's occupation is required" })
    })
        .regex(/^[a-zA-Z\s]+$/, "Local guardian's occupation can only contain letters and spaces")
        .trim()
        .min(1, "Local guardian's occupation is required"),
    contactNo: z.string({
        errorMap: () => ({ message: "Local guardian's contactNo is required" })
    })
        .regex(phonePattern, "Local guardian's contact number must be a valid international phone number")
        .trim()
        .min(1, "Local guardian's contact number is required"),
    address: z.string({
        errorMap: () => ({ message: "Local guardian's address is required" })
    }).trim().min(1, "Local guardian's address is required"),
}, {
    required_error: "Local guardian's Field is require"
});

const userNameValidationSchema = z.object({
    firstName: z.string({
        errorMap: () => ({ message: "First name is required" })
    })
        .regex(/^[a-zA-Z]+$/, "First name can only contain letters")
        .max(10, "First name must be at most 10 characters"),
    middleName: z.string({
        errorMap: () => ({ message: "Middle name is required" })
    })
        .regex(/^[a-zA-Z]+$/, "Middle name can only contain letters")
        .or(z.literal("")),
    lastName: z.string({
        errorMap: () => ({ message: "Last name is required" })
    })
        .regex(/^[a-zA-Z]+$/, "Last name can only contain letters")
        .min(1, "Last name is required")
        .max(10, "Last name must be at most 10 characters"),
}, {
    required_error: "User name's Field is require"
});

const createStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            id: z.string({
                required_error: "ID ",
                invalid_type_error: 'ID must be string.'
            })
                .trim()
                .min(1, "ID is required")
                .optional()
            ,
            user: z.string()
                .regex(ObjectIdRegex, 'Invalid User ID')
                .refine(val => Types.ObjectId.isValid(val), {
                    message: 'Invalid User ID format',
                })
                .transform((val) => new Types.ObjectId(val))
                .optional(),
            name: userNameValidationSchema,
            password: z.string({
                required_error: "Password is required"
            })
                .min(6, "Password must be greater than 6 character")
                .max(20, "Password must be less than 20 character")
                .optional(),
            gender: z.enum(['male', 'female'], {
                required_error: "Gender must be male or female",
                invalid_type_error: "gender must be string"
            }),
            dateOfBirth: z.string({
                required_error: "date of birth is required",
                invalid_type_error: "date must be string"
            })
                .trim()
                .min(1, "Date of birth is required"),
            email: z.string({
                required_error: "email is required",
                invalid_type_error: "email must be string"
            })
                .email("Email must be a valid email address")
                .trim()
                .min(1, "Email is required"),
            contactNo: z.string({
                required_error: "contact no is required"
            })
                .regex(phonePattern, "Contact number must be a valid international phone number (e.g., +8801712345678)")
                .trim()
                .min(1, "Contact number is required"),
            emergencyContactNo: z.string({
                required_error: "emergency contact no is required"
            })
                .regex(phonePattern, "Emergency contact number must be a valid international phone number (e.g., +8801712345678)")
                .trim()
                .min(1, "Emergency contact number is required"),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
                required_error: "Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
                invalid_type_error: "blood group must be string"
            }),
            presentAddress: z.string({
                required_error: "present address is required",
                invalid_type_error: "present address must be string"
            })
                .trim()
                .min(1, "Present address is required"),
            permanentAddress: z.string({
                required_error: "permanent address is required",
                invalid_type_error: "permanent address must be string"
            })
                .trim()
                .min(1, "Permanent address is required"),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImg: z.string()
                .url("Profile image must be a valid URL")
                .trim()
                .optional()
        }, {
            required_error: "do not get student data"
        })
    }, {
        required_error: "do not get request body"
    })
})

export const studentValidation = {
    createStudentValidationSchema
}