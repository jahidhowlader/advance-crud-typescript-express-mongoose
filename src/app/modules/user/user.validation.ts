import { z } from "zod";
import config from "../../config";
import { UserStatus } from "./user.constant";

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: 'Password must be string.'
    })
        .min(6, "Password should minimum 6 characters")
        .optional()
        .default(config.DEFAULT_PASSWORD as string)
})

const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...UserStatus] as [string, ...string[]]),
    }),
});

export const userValidation = {
    userValidationSchema,
    changeStatusValidationSchema
}