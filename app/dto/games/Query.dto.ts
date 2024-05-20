import { z } from 'zod'

export const QueryGamesDto = z.object({
  category: z.string().optional(),
})

export type IQueryGamesDto = z.infer<typeof QueryGamesDto>
