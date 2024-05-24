import { z } from 'zod'

export const UpdateGameDto = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(5).max(400),
  image: z.string().min(5).max(300),
  link: z.string().url(),
  categories: z.string().array().optional(),
})

export type IUpdateGameDto = z.infer<typeof UpdateGameDto>
