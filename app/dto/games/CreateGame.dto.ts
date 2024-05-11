import { z } from 'zod'

export const CreateGameDto = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(5).max(400),
  developer: z.string().min(3).max(70),
  image: z.string().min(5).max(300),
  link: z.string().url(),
})

export type ICreateGameDto = z.infer<typeof CreateGameDto>
