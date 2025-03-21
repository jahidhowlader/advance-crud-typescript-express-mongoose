import { z } from 'zod';

const phonePattern = /^\+?[1-9]\d{1,3}\d{6,14}$/; // International phone number pattern

const guardianValidationSchema = z.object({
    fatherName: z.string({
        errorMap: () => ({ message: "father name is required" })
    })
        .regex(/^[a-zA-Z\s]+$/, "Father's name can only contain letters and spaces")
        .trim()
        .min(1, "Father's name is required"),
    fatherOccupation: z.string({
        errorMap: () => ({ message: "father occupation is required" })
    })
        .regex(/^[a-zA-Z\s]+$/, "Father's occupation can only contain letters and spaces")
        .trim()
        .min(1, "Father's occupation is required"),
    fatherContactNo: z.string({
        errorMap: () => ({ message: "father contactNo is required" })
    })
        .regex(phonePattern, "Father's contact number must be a valid international phone number")
        .trim()
        .min(1, "Father's contact number is required"),
    motherName: z.string({
        errorMap: () => ({ message: "mother name is required" })
    })
        .regex(/^[a-zA-Z\s]+$/, "Mother's name can only contain letters and spaces")
        .trim()
        .min(1, "Mother's name is required"),
    motherOccupation: z.string({
        errorMap: () => ({ message: "mother occupation is required" })
    })
        .regex(/^[a-zA-Z\s]+$/, "Mother's occupation can only contain letters and spaces")
        .trim()
        .min(1, "Mother's occupation is required"),
    motherContactNo: z.string({
        errorMap: () => ({ message: "mother contactNo is required" })
    })
        .regex(phonePattern, "Mother's contact number must be a valid international phone number")
        .trim()
        .min(1, "Mother's contact number is required"),
});

const localGuardianValidationSchema = z.object({
    name: z.string({
        errorMap: () => ({ message: "local guardian name is required" })
    })
        .regex(/^[a-zA-Z\s]+$/, "Local guardian's name can only contain letters and spaces")
        .trim()
        .min(1, "Local guardian's name is required"),
    occupation: z.string({
        errorMap: () => ({ message: "local guardian occupation is required" })
    })
        .regex(/^[a-zA-Z\s]+$/, "Local guardian's occupation can only contain letters and spaces")
        .trim()
        .min(1, "Local guardian's occupation is required"),
    contactNo: z.string({
        errorMap: () => ({ message: "local guardian contactNo is required" })
    })
        .regex(phonePattern, "Local guardian's contact number must be a valid international phone number")
        .trim()
        .min(1, "Local guardian's contact number is required"),
    address: z.string({
        errorMap: () => ({ message: "local guardian address is required" })
    }).trim().min(1, "Local guardian's address is required"),
});

const userNameValidationSchema = z.object({
    firstName: z.string({
        errorMap: () => ({ message: "firstName is required" })
    })
        .regex(/^[a-zA-Z]+$/, "First name can only contain letters")
        .min(1, "First name is required")
        .max(10, "First name must be at most 10 characters"),
    middleName: z.string()
        .regex(/^[a-zA-Z]+$/, "Middle name can only contain letters")
        .optional(),
    lastName: z.string({
        errorMap: () => ({ message: "lastName is required" })
    })
        .regex(/^[a-zA-Z]+$/, "Last name can only contain letters")
        .min(1, "Last name is required")
        .max(10, "Last name must be at most 10 characters"),
});

const studentValidationSchemaWithZod = z.object({
    id: z.string({
        errorMap: () => ({ message: "ID is required" })
    })
        .trim()
        .min(1, "ID is required"),
    name: userNameValidationSchema,
    password: z.string({
        errorMap: () => ({ message: "Password is required" })
    })
        .min(6, "Password must be greater than 6 character")
        .max(20, "Password must be less than 20 character"),
    gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Gender must be male or female' })
    }),
    dateOfBirth: z.string({
        errorMap: () => ({ message: "date of birth is required" })
    })
        .trim()
        .min(1, "Date of birth is required"),
    email: z.string({
        errorMap: () => ({ message: "email is required" })
    })
        .email("Email must be a valid email address")
        .trim()
        .min(1, "Email is required"),
    contactNo: z.string({
        errorMap: () => ({ message: "contact no is required" })
    })
        .regex(phonePattern, "Contact number must be a valid international phone number (e.g., +8801712345678)")
        .trim()
        .min(1, "Contact number is required"),
    emergencyContactNo: z.string({
        errorMap: () => ({ message: "emergency contact no is required" })
    })
        .regex(phonePattern, "Emergency contact number must be a valid international phone number (e.g., +8801712345678)")
        .trim()
        .min(1, "Emergency contact number is required"),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-' })
    }),
    presentAddress: z.string({
        errorMap: () => ({ message: "present address is required" })
    })
        .trim()
        .min(1, "Present address is required"),
    permanentAddress: z.string({
        errorMap: () => ({ message: "permanent address is required" })
    })
        .trim()
        .min(1, "Permanent address is required"),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string()
        .url("Profile image must be a valid URL")
        .trim()
        .optional(),
    isActive: z.enum(['active', 'blocked'], {
        errorMap: () => ({ message: 'Status must be either active or blocked' })
    }).default('active'),
    isDeleted: z.boolean({
        errorMap: () => ({ message: "IsDeleted is required" })
    })
});

export default studentValidationSchemaWithZod