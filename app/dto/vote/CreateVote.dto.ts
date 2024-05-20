import { z } from 'zod'

export const CreateVoteDto = z.object({
  gameId: z.string(),
})

export type ICreateVoteDto = z.infer<typeof CreateVoteDto>
