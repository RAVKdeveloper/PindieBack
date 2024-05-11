import { z } from 'zod'

export const UpdateUserDto = z.object({
  username: z.string().min(5).max(70),
  password: z.string().min(5).max(100),
})

export type IUpdateUserDto = z.infer<typeof UpdateUserDto>
