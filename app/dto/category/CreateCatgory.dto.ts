import { z } from 'zod'

export const CreateCategoryDto = z.object({
  name: z.string(),
})

export type ICreateCategory = z.infer<typeof CreateCategoryDto>
