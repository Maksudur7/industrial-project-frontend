import {z} from "zod"
export const loginZodSchema = z.object({
    email : z.email("Invalid Email Address"),
    password : z.string().min(1, "password must me 1").min(8, "password must me at lase 8 character")
})

export type ILoginPaylod = z.infer<typeof loginZodSchema>