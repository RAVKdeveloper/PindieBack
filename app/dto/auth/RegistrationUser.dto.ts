import { z } from 'zod'

export const RegistrationUserDto = z.object({
  username: z.string().min(5).max(70),
  email: z.string().email(),
  password: z.string().min(5).max(100),
})

export type IRegistrationUserDto = z.infer<typeof RegistrationUserDto>
