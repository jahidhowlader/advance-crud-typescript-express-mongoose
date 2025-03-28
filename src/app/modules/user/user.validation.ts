import { z } from "zod";
import config from "../../config";

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: 'Password must be string.'
    })
        .min(6, "Password should minimum 6 characters")
        .optional()
        .default(config.DEFAULT_PASSWORD as string)
})

export default userValidationSchema