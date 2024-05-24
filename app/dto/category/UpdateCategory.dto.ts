import { z } from 'zod'

export const UpdateCategoryDto = z.object({
  name: z.string(),
})

export type IUpdateCategoryDto = z.infer<typeof UpdateCategoryDto>
