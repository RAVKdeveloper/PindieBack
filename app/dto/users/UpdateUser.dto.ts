import { z } from 'zod'

export const UpdateUserDto = z.object({
  username: z.string().min(5).max(70),
  email: z.string().email(),
})

export type IUpdateUserDto = z.infer<typeof UpdateUserDto>
