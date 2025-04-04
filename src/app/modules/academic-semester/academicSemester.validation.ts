import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.conatant";
import { currentYear } from "../../utils/conatantUtils";

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
            required_error: "Semester name must be one of Autumn, Fall, Summer",
            invalid_type_error: "Semester name must be string"
        }),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
            required_error: "Semester code must be one of 01, 02, 03",
            invalid_type_error: "Semester code must be string"
        }),
        year: z.string({
            required_error: "Semester years is require"
        })
            .regex(/^\d{4}$/, { message: 'Year must be a 4-digit number' })
            .transform((val) => Number(val))
            .refine((val) => val >= currentYear && val <= 2099, {
                message: `Year must be between ${currentYear} and 2099`,
            }),
        startMonth: z.enum([...Months] as [string, ...string[]], {
            required_error: "Semester starts months must be one of January, February, March, April, May, June, July, August, September, October, November, December",
            invalid_type_error: "Semester starts month must be string"
        }),
        endMonth: z.enum([...Months] as [string, ...string[]], {
            required_error: "Semester ends months must be one of January, February, March, April, May, June, July, August, September, October, November, December",
            invalid_type_error: "Semester ends month must be string"
        })
    })
})

const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
        startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    }),
});

export const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
}