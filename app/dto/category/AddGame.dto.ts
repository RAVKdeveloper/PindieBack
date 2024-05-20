import { z } from 'zod'

export const AddGameToCategoryDto = z.object({
  categoryId: z.string(),
  gameId: z.string(),
})

export type IAddGameToCategory = z.infer<typeof AddGameToCategoryDto>
