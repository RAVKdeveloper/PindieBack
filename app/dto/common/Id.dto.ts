import { z } from 'zod'

export const IdDto = z.object({
  id: z.string(),
})
