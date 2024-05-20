import { z } from 'zod'

export const RemoveGameToCategoryDto = z.object({
  categoryId: z.string(),
  gameId: z.string(),
})

export type IRemoveGameToCategoryDto = z.infer<typeof RemoveGameToCategoryDto>
