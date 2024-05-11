import { z } from 'zod'

export const LoginUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(100),
})

export type ILoginUserDto = z.infer<typeof LoginUserDto>
