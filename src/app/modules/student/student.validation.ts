import Joi from 'joi';

const phonePattern = /^\+?[1-9]\d{1,3}\d{6,14}$/; // International phone number pattern

const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().pattern(/^[a-zA-Z\s]+$/).trim().required().messages({
        'string.empty': "Father's name is required",
        'string.pattern.base': "Father's name can only contain letters and spaces",
    }),
    fatherOccupation: Joi.string().pattern(/^[a-zA-Z\s]+$/).trim().required().messages({
        'string.empty': "Father's occupation is required",
        'string.pattern.base': "Father's occupation can only contain letters and spaces",
    }),
    fatherContactNo: Joi.string().pattern(phonePattern).trim().required().messages({
        'string.empty': "Father's contact number is required",
        'string.pattern.base': "Father's contact number must be a valid international phone number",
    }),
    motherName: Joi.string().pattern(/^[a-zA-Z\s]+$/).trim().required().messages({
        'string.empty': "Mother's name is required",
        'string.pattern.base': "Mother's name can only contain letters and spaces",
    }),
    motherOccupation: Joi.string().pattern(/^[a-zA-Z\s]+$/).trim().required().messages({
        'string.empty': "Mother's occupation is required",
        'string.pattern.base': "Mother's occupation can only contain letters and spaces",
    }),
    motherContactNo: Joi.string().pattern(phonePattern).trim().required().messages({
        'string.empty': "Mother's contact number is required",
        'string.pattern.base': "Mother's contact number must be a valid international phone number",
    }),
});

const localGuardianValidationSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z\s]+$/).trim().required().messages({
        'string.empty': "Local guardian's name is required",
        'string.pattern.base': "Local guardian's name can only contain letters and spaces",
    }),
    occupation: Joi.string().pattern(/^[a-zA-Z\s]+$/).trim().required().messages({
        'string.empty': "Local guardian's occupation is required",
        'string.pattern.base': "Local guardian's occupation can only contain letters and spaces",
    }),
    contactNo: Joi.string().pattern(phonePattern).trim().required().messages({
        'string.empty': "Local guardian's contact number is required",
        'string.pattern.base': "Local guardian's contact number must be a valid international phone number",
    }),
    address: Joi.string().trim().required().messages({
        'string.empty': "Local guardian's address is required",
    }),
});

export const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(1)
        .max(10)
        .trim()
        .required()
        .messages({
            'string.base': 'First name must be a string',
            'string.empty': 'First name is required',
            'string.pattern.base': 'First name can only contain letters',
        }),
    middleName: Joi.string().pattern(/^[a-zA-Z]+$/).trim().allow('').messages({
        'string.pattern.base': 'Middle name can only contain letters',
    }),
    lastName: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .min(1)
        .max(10)
        .trim()
        .required()
        .messages({
            'string.base': 'Last name must be a string',
            'string.empty': 'Last name is required',
            'string.pattern.base': 'Last name can only contain letters',
        }),
});

export const studentValidationSchema = Joi.object({
    id: Joi.string()
        .trim()
        .required()
        .messages({
            'string.base': 'ID must be a string',
            'string.empty': 'ID is required',
        }),
    name: userNameValidationSchema.required(),
    gender: Joi.string()
        .valid('male', 'female')
        .required()
        .messages({
            'any.only': 'Gender must be male or female',
            'string.empty': 'Gender is required',
        }),
    dateOfBirth: Joi.string().trim().required().messages({
        'string.empty': 'Date of birth is required',
    }),
    email: Joi.string().email().trim().lowercase().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    contactNo: Joi.string()
        .pattern(phonePattern)
        .trim()
        .required()
        .messages({
            'string.pattern.base': 'Contact number must be a valid international phone number (e.g., +8801712345678)',
            'string.empty': 'Contact number is required',
        }),
    emergencyContactNo: Joi.string()
        .pattern(phonePattern)
        .trim()
        .required()
        .messages({
            'string.pattern.base': 'Emergency contact number must be a valid international phone number (e.g., +8801712345678)',
            'string.empty': 'Emergency contact number is required',
        }),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required()
        .messages({
            'any.only': 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
            'string.empty': 'Blood group is required',
        }),
    presentAddress: Joi.string().trim().required().messages({
        'string.empty': 'Present address is required',
    }),
    permanentAddress: Joi.string().trim().required().messages({
        'string.empty': 'Permanent address is required',
    }),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImg: Joi.string()
        .uri()
        .trim()
        .optional()
        .messages({
            'string.uri': 'Profile image must be a valid URL',
        }),
    isActive: Joi.string().valid('active', 'blocked').default('active').messages({
        'any.only': 'Status must be either active or blocked',
    }),
});