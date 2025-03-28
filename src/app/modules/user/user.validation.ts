import { z } from "zod";

const userValidationSchema = z.object({
    id: z.string({
        errorMap: () => ({ message: "ID is required" })
    })
        .trim()
        .min(1, "ID is required"),
    password: z.string({
        errorMap: () => ({ message: "Password is required" })
    })
        .trim()
        .min(6, "Password should minimum 6 characters"),
    needsPasswordChange: z.boolean({
        errorMap: () => ({ message: "Needs Password Change is required" })
    }),
    role: z.enum(['student', 'faculty', 'admin'], {
        errorMap: () => ({ message: 'Rome must be student, faculty or admin' })
    }),
    isActive: z.enum(['in-progress', 'blocked'], {
        errorMap: () => ({ message: 'Status must be either active or blocked' })
    })
    // .default('active'),
})

export default userValidationSchema